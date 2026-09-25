import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Bookmark, 
  AlertCircle, 
  BookOpen, 
  Send, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';
import { Question, QuizFilterConfig, ExamResult } from '../types';

interface QuizRunnerProps {
  questions: Question[];
  config: QuizFilterConfig;
  onFinishQuiz: (result: ExamResult, userAnswers: Record<string, number>) => void;
  onQuitQuiz: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  questions,
  config,
  onFinishQuiz,
  onQuitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer: 1.5 minutes per question in exam mode
  const totalSecondsAllowed = config.mode === 'exam' ? questions.length * 90 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSecondsAllowed);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);

      if (config.mode === 'exam') {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.mode, questions]);

  const currentQ = questions[currentIndex];
  const isAnswered = currentQ && userAnswers[currentQ.id] !== undefined;
  const selectedOptionIndex = currentQ ? userAnswers[currentQ.id] : undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const calculateResult = (): ExamResult => {
    let correctCount = 0;
    const levelBreakdown = {
      nhan_biet: { total: 0, correct: 0 },
      thong_hieu: { total: 0, correct: 0 },
      van_dung: { total: 0, correct: 0 },
    };
    const lessonBreakdown = {
      'bai-3': { total: 0, correct: 0 },
      'bai-4': { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;

      // Level
      const lvl = q.level as 'nhan_biet' | 'thong_hieu' | 'van_dung';
      if (levelBreakdown[lvl]) {
        levelBreakdown[lvl].total++;
        if (isCorrect) levelBreakdown[lvl].correct++;
      }

      // Lesson
      const lId = q.lessonId as 'bai-3' | 'bai-4';
      if (lessonBreakdown[lId]) {
        lessonBreakdown[lId].total++;
        if (isCorrect) lessonBreakdown[lId].correct++;
      }
    });

    const score = Number(((correctCount / questions.length) * 10).toFixed(1));
    const percentage = Math.round((correctCount / questions.length) * 100);

    let rating: ExamResult['rating'] = 'Cần cố gắng';
    if (score >= 9) rating = 'Xuất sắc';
    else if (score >= 8) rating = 'Giỏi';
    else if (score >= 6.5) rating = 'Khá';
    else if (score >= 5) rating = 'Trung bình';

    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score,
      percentage,
      timeSpentSeconds: timeElapsed,
      rating,
      levelBreakdown,
      lessonBreakdown,
    };
  };

  const handleSubmitExam = () => {
    const result = calculateResult();
    onFinishQuiz(result, userAnswers);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Top Bar: Progress, Timer, Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onQuitQuiz}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Thoát về cấu hình"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                config.mode === 'practice' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-indigo-100 text-indigo-800'
              }`}>
                {config.mode === 'practice' ? 'Chế độ Luyện tập' : 'Chế độ Thi thử'}
              </span>
            </div>
            <div className="w-36 sm:w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {config.mode === 'exam' && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold ${
              secondsRemaining < 120 
                ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' 
                : 'bg-slate-100 text-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          )}

          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={`p-2 rounded-lg border transition-all ${
              flaggedQuestions[currentQ.id]
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title="Đánh dấu câu cần xem lại"
          >
            <Bookmark className={`w-5 h-5 ${flaggedQuestions[currentQ.id] ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Nộp Bài</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Badges: Lesson & Difficulty Level */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
              {currentQ.lessonTitle}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
              currentQ.level === 'nhan_biet'
                ? 'bg-emerald-100 text-emerald-800'
                : currentQ.level === 'thong_hieu'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              Cấp độ: {currentQ.levelLabel}
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {currentQ.topic}
          </span>
        </div>

        {/* Question Text */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            <span className="text-blue-600 mr-2">Câu {currentIndex + 1}:</span>
            {currentQ.question}
          </h3>
        </div>

        {/* Options (A, B, C, D) */}
        <div className="space-y-3">
          {currentQ.options.map((optionText, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            // In Practice Mode: reveal colors right away once answered
            let optionStyles = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-slate-800';
            let letterBg = 'bg-slate-100 text-slate-700';

            if (config.mode === 'practice' && isAnswered) {
              if (isCorrect) {
                optionStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium shadow-xs';
                letterBg = 'bg-emerald-600 text-white';
              } else if (isSelected && !isCorrect) {
                optionStyles = 'border-rose-400 bg-rose-50/80 text-rose-950';
                letterBg = 'bg-rose-600 text-white';
              } else {
                optionStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-70';
              }
            } else if (isSelected) {
              optionStyles = 'border-blue-600 bg-blue-50 text-blue-950 font-semibold shadow-xs';
              letterBg = 'bg-blue-600 text-white';
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${optionStyles}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${letterBg}`}>
                  {letter}
                </span>
                <span className="text-sm sm:text-base leading-snug flex-1 pt-0.5">
                  {optionText}
                </span>

                {/* Practice Mode Icons */}
                {config.mode === 'practice' && isAnswered && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Practice Mode Immediate Explanation */}
        {config.mode === 'practice' && isAnswered && (
          <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Giải thích chi tiết & Trích dẫn SGK:</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {currentQ.explanation}
            </p>
            <div className="text-xs font-semibold text-blue-700 bg-blue-100/60 inline-block px-2.5 py-1 rounded">
              📖 {currentQ.textbookReference}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm flex items-center gap-2 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Hoàn Thành & Nộp Bài</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Question Jump Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
          <span>Bảng câu hỏi ({answeredCount}/{questions.length} đã trả lời)</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Đã làm</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Chưa làm</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Đánh dấu</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const hasAnswer = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            const isFlag = flaggedQuestions[q.id];

            let cellClass = 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100';
            if (hasAnswer) {
              cellClass = 'border-blue-600 bg-blue-600 text-white font-bold';
            }
            if (isCurrent) {
              cellClass += ' ring-2 ring-blue-400 ring-offset-2';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-9 h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${cellClass}`}
              >
                {idx + 1}
                {isFlag && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Xác nhận nộp bài</h3>
                <p className="text-xs text-slate-500">Xem lại tình trạng trước khi chấm điểm</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Số câu hỏi:</span>
                <span className="font-bold text-slate-900">{questions.length} câu</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Đã trả lời:</span>
                <span className="font-bold">{answeredCount} câu</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-amber-700 font-medium">
                  <span>Chưa trả lời:</span>
                  <span className="font-bold">{unansweredCount} câu</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Thời gian đã làm:</span>
                <span className="font-bold text-slate-900">{formatTime(timeElapsed)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                ⚠️ Bạn vẫn còn {unansweredCount} câu chưa chọn đáp án. Bạn có chắc chắn muốn nộp bài bây giờ không?
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-sm text-slate-700 transition-colors"
              >
                Tiếp tục làm
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
