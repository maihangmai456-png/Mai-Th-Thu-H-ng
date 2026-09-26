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
      {/* Top Bar: Progress, Timer, Mode - Vibrant Warm Colors */}
      <div className="bg-gradient-to-r from-sky-100 via-indigo-100 to-amber-100 rounded-3xl border-2 border-indigo-300 shadow-md p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onQuitQuiz}
            className="p-2.5 rounded-xl text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white border border-slate-300 shadow-xs transition-colors cursor-pointer"
            title="Thoát về cấu hình"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-black text-slate-950 text-base sm:text-lg">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className={`text-xs sm:text-sm px-3 py-1 rounded-xl font-black ${
                config.mode === 'practice' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-indigo-600 text-white shadow-xs'
              }`}>
                {config.mode === 'practice' ? 'Luyện tập (Xem giải ngay)' : 'Thi thử (Chấm điểm)'}
              </span>
            </div>
            <div className="w-40 sm:w-56 bg-slate-300/80 h-2.5 rounded-full overflow-hidden mt-2 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {config.mode === 'exam' && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-base font-black shadow-xs ${
              secondsRemaining < 120 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white text-slate-900 border-2 border-indigo-200'
            }`}>
              <Clock className="w-5 h-5" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          )}

          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
              flaggedQuestions[currentQ.id]
                ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md'
                : 'bg-white/80 border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-white'
            }`}
            title="Đánh dấu câu cần xem lại"
          >
            <Bookmark className={`w-5 h-5 ${flaggedQuestions[currentQ.id] ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            <span>Nộp Bài</span>
          </button>
        </div>
      </div>

      {/* Main Question Card - Vibrant Tinted Non-White Card */}
      <div className="bg-gradient-to-br from-amber-50/95 via-sky-50/95 to-indigo-50/95 rounded-3xl border-3 border-indigo-300 shadow-xl p-6 sm:p-9 space-y-7">
        
        {/* Badges: Lesson & Difficulty Level */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-indigo-200/80 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black bg-blue-100 text-blue-900 border border-blue-300 shadow-xs">
              {currentQ.lessonTitle}
            </span>
            <span className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black shadow-xs ${
              currentQ.level === 'nhan_biet'
                ? 'bg-emerald-200 text-emerald-950 border border-emerald-400'
                : currentQ.level === 'thong_hieu'
                ? 'bg-sky-200 text-sky-950 border border-sky-400'
                : 'bg-purple-200 text-purple-950 border border-purple-400'
            }`}>
              Cấp độ: {currentQ.levelLabel}
            </span>
          </div>

          <span className="text-xs sm:text-sm font-bold text-indigo-900 bg-white/70 px-3 py-1 rounded-lg border border-indigo-200">
            {currentQ.topic}
          </span>
        </div>

        {/* Question Text - Big, High Contrast, Crisp Typography */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 leading-snug tracking-tight">
            <span className="text-blue-700 mr-2.5">Câu {currentIndex + 1}:</span>
            {currentQ.question}
          </h3>
        </div>

        {/* Options (A, B, C, D) - Large, High Contrast, Colorful States */}
        <div className="space-y-3.5">
          {currentQ.options.map((optionText, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            // In Practice Mode: reveal colors right away once answered
            let optionStyles = 'border-slate-300 bg-white/80 hover:border-amber-400 hover:bg-amber-100/90 text-slate-900 shadow-xs';
            let letterBg = 'bg-slate-200 text-slate-900 border border-slate-300';

            if (config.mode === 'practice' && isAnswered) {
              if (isCorrect) {
                optionStyles = 'border-emerald-600 bg-emerald-100 text-emerald-950 font-black shadow-lg ring-2 ring-emerald-500 scale-101';
                letterBg = 'bg-emerald-600 text-white';
              } else if (isSelected && !isCorrect) {
                optionStyles = 'border-rose-500 bg-rose-100 text-rose-950 font-bold shadow-md';
                letterBg = 'bg-rose-600 text-white';
              } else {
                optionStyles = 'border-slate-200 bg-white/40 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyles = 'border-blue-600 bg-blue-100 text-blue-950 font-black shadow-lg ring-2 ring-blue-500 scale-101';
              letterBg = 'bg-blue-600 text-white';
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 sm:p-5 rounded-2xl border-3 cursor-pointer transition-all flex items-start gap-4 ${optionStyles}`}
              >
                <span className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-base sm:text-lg font-black shrink-0 transition-colors shadow-xs ${letterBg}`}>
                  {letter}
                </span>
                <span className="text-base sm:text-xl font-bold leading-normal flex-1 pt-1 text-slate-950">
                  {optionText}
                </span>

                {/* Practice Mode Icons */}
                {config.mode === 'practice' && isAnswered && (
                  <div className="shrink-0 pt-1">
                    {isCorrect ? (
                      <CheckCircle className="w-7 h-7 text-emerald-600 stroke-[2.5]" />
                    ) : isSelected ? (
                      <XCircle className="w-7 h-7 text-rose-600 stroke-[2.5]" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Practice Mode Immediate Explanation - Warm Sunny Callout */}
        {config.mode === 'practice' && isAnswered && (
          <div className="mt-5 p-6 rounded-2xl bg-gradient-to-r from-amber-100/95 via-orange-50/95 to-yellow-100/95 border-2 border-amber-400 space-y-2.5 shadow-md animate-fadeIn">
            <div className="flex items-center gap-2 text-sm sm:text-base font-black uppercase tracking-wider text-amber-950">
              <BookOpen className="w-5 h-5 text-amber-700 stroke-[2.5]" />
              <span>Giải thích chi tiết & Trích dẫn SGK:</span>
            </div>
            <p className="text-base sm:text-lg text-slate-950 leading-relaxed font-semibold">
              {currentQ.explanation}
            </p>
            <div className="text-xs sm:text-sm font-black text-blue-900 bg-blue-200/90 inline-block px-3.5 py-1.5 rounded-xl border border-blue-300 shadow-xs">
              📖 {currentQ.textbookReference}
            </div>
          </div>
        )}

        {/* Navigation buttons - Big, Bold, Vibrant */}
        <div className="pt-4 border-t-2 border-indigo-200/80 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-5 py-3.5 rounded-2xl border-2 border-slate-300 bg-white/90 text-slate-800 font-extrabold text-sm sm:text-base flex items-center gap-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span>Câu trước</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg flex items-center gap-2.5 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base sm:text-lg flex items-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5 stroke-[2.5]" />
              <span>Hoàn Thành & Nộp Bài</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Question Jump Grid - Warm Tinted Card */}
      <div className="bg-gradient-to-r from-sky-100/90 to-indigo-100/90 rounded-3xl border-2 border-indigo-200 shadow-md p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3.5 text-xs sm:text-sm text-slate-800 font-bold">
          <span>Bảng câu hỏi ({answeredCount}/{questions.length} đã trả lời)</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-600"></span> Đã làm</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-white border border-slate-300"></span> Chưa làm</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400"></span> Đánh dấu</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {questions.map((q, idx) => {
            const hasAnswer = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            const isFlag = flaggedQuestions[q.id];

            let cellClass = 'border-2 border-slate-300 bg-white/90 text-slate-800 hover:bg-sky-100 font-bold';
            if (hasAnswer) {
              cellClass = 'border-2 border-blue-600 bg-blue-600 text-white font-black shadow-sm';
            }
            if (isCurrent) {
              cellClass += ' ring-3 ring-amber-400 ring-offset-2 scale-110';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-sm sm:text-base font-black flex items-center justify-center transition-all cursor-pointer ${cellClass}`}
              >
                {idx + 1}
                {isFlag && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-amber-50 to-sky-50 rounded-3xl max-w-md w-full p-7 shadow-2xl border-3 border-indigo-300 space-y-6 animate-scaleUp">
            <div className="flex items-center gap-3.5 text-slate-900">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-950">Xác nhận nộp bài</h3>
                <p className="text-sm font-semibold text-slate-700">Kiểm tra lại trước khi hoàn thành</p>
              </div>
            </div>

            <div className="bg-white/90 rounded-2xl p-5 space-y-2.5 text-sm sm:text-base border-2 border-slate-200">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Số câu hỏi:</span>
                <span className="font-black text-slate-950">{questions.length} câu</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Đã trả lời:</span>
                <span className="font-black text-emerald-700">{answeredCount} câu</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-rose-700 font-bold">
                  <span>Chưa trả lời:</span>
                  <span className="font-black text-rose-700">{unansweredCount} câu</span>
                </div>
              )}
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Thời gian đã làm:</span>
                <span className="font-black text-slate-950">{formatTime(timeElapsed)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-sm font-bold text-amber-950 bg-amber-100 p-4 rounded-2xl border-2 border-amber-300">
                ⚠️ Bạn vẫn còn {unansweredCount} câu chưa chọn đáp án. Bạn có muốn nộp bài bây giờ không?
              </p>
            )}

            <div className="flex items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-slate-300 hover:bg-white bg-white/80 font-bold text-sm sm:text-base text-slate-800 transition-colors cursor-pointer"
              >
                Tiếp tục làm
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base transition-colors shadow-md cursor-pointer"
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
