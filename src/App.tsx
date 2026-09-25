import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuizConfigurator } from './components/QuizConfigurator';
import { QuizRunner } from './components/QuizRunner';
import { QuizResult } from './components/QuizResult';
import { PrintExamModal } from './components/PrintExamModal';
import { FlashcardsView } from './components/FlashcardsView';
import { TextbookSummaryView } from './components/TextbookSummaryView';
import { HistoryModal, HistoryItem } from './components/HistoryModal';
import { Question, QuizFilterConfig, ExamResult } from './types';
import { getBuiltinQuiz, fetchAIQuiz } from './utils/quizHelper';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards' | 'summary' | 'history'>('quiz');
  const [currentQuestions, setCurrentQuestions] = useState<Question[] | null>(null);
  const [activeConfig, setActiveConfig] = useState<QuizFilterConfig | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Print modal state
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printQuestions, setPrintQuestions] = useState<Question[]>([]);
  const [printConfig, setPrintConfig] = useState<QuizFilterConfig | null>(null);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('eduquiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('eduquiz_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Handle start quiz
  const handleStartQuiz = async (config: QuizFilterConfig) => {
    setErrorMessage(null);

    if (config.useAI) {
      setIsLoadingAI(true);
      try {
        const questions = await fetchAIQuiz(config);
        setCurrentQuestions(questions);
        setActiveConfig(config);
        setExamResult(null);
        setUserAnswers({});
      } catch (err: any) {
        console.warn('AI quiz generation failed, falling back to built-in bank:', err);
        setErrorMessage(
          `Không thể kết nối AI Gemini (${err?.message || 'vui lòng thử lại'}). Hệ thống đã tự động chuyển sang Kho câu hỏi chuẩn SGK để bạn làm bài ngay!`
        );
        // Fallback to built-in questions seamlessly
        const fallbackQuestions = getBuiltinQuiz({ ...config, useAI: false });
        setCurrentQuestions(fallbackQuestions);
        setActiveConfig({ ...config, useAI: false });
        setExamResult(null);
        setUserAnswers({});
      } finally {
        setIsLoadingAI(false);
      }
    } else {
      const questions = getBuiltinQuiz(config);
      setCurrentQuestions(questions);
      setActiveConfig(config);
      setExamResult(null);
      setUserAnswers({});
    }
  };

  // Handle finish quiz
  const handleFinishQuiz = (result: ExamResult, answers: Record<string, number>) => {
    setExamResult(result);
    setUserAnswers(answers);

    // Save to history
    if (activeConfig) {
      const lessonTitle =
        activeConfig.lessonId === 'bai-3'
          ? 'Bài 3: Công nghệ phổ biến'
          : activeConfig.lessonId === 'bai-4'
          ? 'Bài 4: Một số công nghệ mới'
          : 'Tổng hợp cả Bài 3 & 4';

      const levelTitle =
        activeConfig.level === 'nhan_biet'
          ? 'Cấp độ 1: Nhận biết'
          : activeConfig.level === 'thong_hieu'
          ? 'Cấp độ 2: Thông hiểu'
          : activeConfig.level === 'van_dung'
          ? 'Cấp độ 3: Vận dụng'
          : 'Tổng hợp 3 cấp độ';

      const newHistoryItem: HistoryItem = {
        id: `hist-${Date.now()}`,
        date: new Date().toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        lessonTitle,
        levelTitle,
        result,
      };

      setHistory((prev) => [newHistoryItem, ...prev].slice(0, 30));
    }
  };

  // Handle retry only wrong answers
  const handleRetryIncorrect = (incorrectQuestions: Question[]) => {
    if (!activeConfig) return;
    setCurrentQuestions(incorrectQuestions);
    setExamResult(null);
    setUserAnswers({});
  };

  // Handle new quiz
  const handleNewQuiz = () => {
    setCurrentQuestions(null);
    setExamResult(null);
    setUserAnswers({});
  };

  // Handle print preview
  const handleOpenPrintModal = async (config: QuizFilterConfig) => {
    setPrintConfig(config);
    if (config.useAI) {
      setIsLoadingAI(true);
      try {
        const questions = await fetchAIQuiz(config);
        setPrintQuestions(questions);
        setPrintModalOpen(true);
      } catch (err: any) {
        const fallback = getBuiltinQuiz({ ...config, useAI: false });
        setPrintQuestions(fallback);
        setPrintModalOpen(true);
      } finally {
        setIsLoadingAI(false);
      }
    } else {
      const questions = getBuiltinQuiz(config);
      setPrintQuestions(questions);
      setPrintModalOpen(true);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài?')) {
      setHistory([]);
    }
  };

  const isTakingQuiz = currentQuestions !== null && examResult === null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          // If moving away from test, reset
          if (tab !== 'quiz') {
            setCurrentQuestions(null);
            setExamResult(null);
          }
        }}
        isTakingQuiz={isTakingQuiz}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4">
        
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-amber-600 hover:text-amber-800 font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab 1: Quiz Workflow */}
        {activeTab === 'quiz' && (
          <>
            {/* Step A: Configurator */}
            {currentQuestions === null && (
              <QuizConfigurator
                onStartQuiz={handleStartQuiz}
                onOpenPrintModal={handleOpenPrintModal}
                isLoadingAI={isLoadingAI}
              />
            )}

            {/* Step B: Quiz Runner */}
            {currentQuestions !== null && examResult === null && activeConfig && (
              <QuizRunner
                questions={currentQuestions}
                config={activeConfig}
                onFinishQuiz={handleFinishQuiz}
                onQuitQuiz={() => {
                  if (window.confirm('Bạn có chắc muốn dừng bài làm hiện tại không?')) {
                    handleNewQuiz();
                  }
                }}
              />
            )}

            {/* Step C: Quiz Result */}
            {examResult !== null && currentQuestions !== null && activeConfig && (
              <QuizResult
                result={examResult}
                questions={currentQuestions}
                userAnswers={userAnswers}
                config={activeConfig}
                onRetryIncorrect={handleRetryIncorrect}
                onNewQuiz={handleNewQuiz}
                onPrintExam={() => {
                  setPrintQuestions(currentQuestions);
                  setPrintConfig(activeConfig);
                  setPrintModalOpen(true);
                }}
              />
            )}
          </>
        )}

        {/* Tab 2: Flashcards View */}
        {activeTab === 'flashcards' && <FlashcardsView />}

        {/* Tab 3: Textbook Summary View */}
        {activeTab === 'summary' && <TextbookSummaryView />}

        {/* Tab 4: History View */}
        {activeTab === 'history' && (
          <HistoryModal
            history={history}
            onClearHistory={handleClearHistory}
            onClose={() => setActiveTab('quiz')}
          />
        )}
      </main>

      {/* Print Exam Modal */}
      {printModalOpen && printConfig && (
        <PrintExamModal
          questions={printQuestions}
          config={printConfig}
          onClose={() => setPrintModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="font-bold text-slate-800">
              GIA SƯ ôn tập công nghệ 10 bài 3,4
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-blue-700">
              Tác giả: GV: Mai Thị Thuý Hằng
            </span>
          </div>
          <span className="text-slate-400">
            SGK Kết nối tri thức với cuộc sống • 3 cấp độ nhận thức & Đề tổng hợp
          </span>
        </div>
      </footer>
    </div>
  );
}
