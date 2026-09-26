import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Clock, 
  Printer, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ArrowRight,
  Award
} from 'lucide-react';
import { ExamResult, Question, QuizFilterConfig } from '../types';

interface QuizResultProps {
  result: ExamResult;
  questions: Question[];
  userAnswers: Record<string, number>;
  config: QuizFilterConfig;
  onRetryIncorrect: (incorrectQuestions: Question[]) => void;
  onNewQuiz: () => void;
  onPrintExam: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  questions,
  userAnswers,
  config,
  onRetryIncorrect,
  onNewQuiz,
  onPrintExam,
}) => {
  const [filterWrongOnly, setFilterWrongOnly] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Trigger confetti on high scores
  useEffect(() => {
    if (result.score >= 8) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [result.score]);

  const incorrectQuestions = questions.filter(
    (q) => userAnswers[q.id] !== q.correctAnswer
  );

  const displayedQuestions = filterWrongOnly ? incorrectQuestions : questions;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} phút ${s} giây`;
  };

  const toggleExpand = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-fadeIn">
      {/* Score Summary Card - Vibrant Gradient Background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-sky-50 to-indigo-50 border-3 border-indigo-200/90 shadow-xl p-6 sm:p-9">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex flex-col items-center justify-center font-black shadow-lg border-2 border-white/60 ${
              result.score >= 8
                ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-green-400 text-white shadow-emerald-500/30'
                : result.score >= 5
                ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-blue-500/30'
                : 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white shadow-amber-500/30'
            }`}>
              <span className="text-4xl sm:text-5xl drop-shadow-sm">{result.score}</span>
              <span className="text-xs sm:text-sm uppercase font-extrabold tracking-wider opacity-90">/ 10 ĐIỂM</span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className={`px-4 py-1.5 rounded-full text-sm font-black shadow-xs ${
                  result.rating === 'Xuất sắc' || result.rating === 'Giỏi'
                    ? 'bg-emerald-200 text-emerald-950 border border-emerald-300'
                    : result.rating === 'Khá'
                    ? 'bg-blue-200 text-blue-950 border border-blue-300'
                    : 'bg-amber-200 text-amber-950 border border-amber-300'
                }`}>
                  ★ Xếp loại: {result.rating}
                </span>
                <span className="text-sm text-slate-700 bg-white/70 px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1.5 font-bold">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  {formatTime(result.timeSpentSeconds)}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Đúng {result.correctAnswers} / {result.totalQuestions} câu ({result.percentage}%)
              </h2>
              <p className="text-base sm:text-lg text-slate-700 font-medium">
                {result.score >= 8
                  ? '🎉 Xuất sắc! Em đã nắm rất vững kiến thức công nghệ phổ biến và các công nghệ mới.'
                  : result.score >= 5
                  ? '👍 Khá tốt! Em hãy rà soát lại các câu sai để ghi nhớ sâu hơn các chi tiết SGK.'
                  : '💪 Cần ôn lại thêm bài học và thử lại để cải thiện kết quả nhé!'}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-3 w-full md:w-auto">
            {incorrectQuestions.length > 0 && (
              <button
                onClick={() => onRetryIncorrect(incorrectQuestions)}
                className="flex-1 md:flex-none py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Làm lại {incorrectQuestions.length} câu sai</span>
              </button>
            )}

            <button
              onClick={onNewQuiz}
              className="flex-1 md:flex-none py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Tạo đề ôn tập mới</span>
            </button>

            <button
              onClick={onPrintExam}
              className="flex-1 md:flex-none py-3 px-5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-indigo-200 text-indigo-900 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-5 h-5 text-indigo-600" />
              <span>In đáp án & lời giải</span>
            </button>
          </div>
        </div>

        {/* Cognitive Level Breakdown Grid */}
        <div className="mt-8 pt-6 border-t-2 border-indigo-200/60">
          <h4 className="text-sm font-black uppercase tracking-wider text-indigo-900 mb-3.5 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Phân tích năng lực theo 3 Cấp độ nhận thức
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Nhận biết */}
            <div className="p-4 rounded-2xl bg-emerald-100/80 border-2 border-emerald-300">
              <div className="flex items-center justify-between text-sm font-black text-emerald-950 mb-1.5">
                <span>Cấp độ 1: Nhận biết</span>
                <span className="text-base font-extrabold">
                  {result.levelBreakdown.nhan_biet.correct} / {result.levelBreakdown.nhan_biet.total}
                </span>
              </div>
              <div className="w-full bg-emerald-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{
                    width: `${
                      result.levelBreakdown.nhan_biet.total > 0
                        ? (result.levelBreakdown.nhan_biet.correct / result.levelBreakdown.nhan_biet.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Thông hiểu */}
            <div className="p-4 rounded-2xl bg-blue-100/80 border-2 border-blue-300">
              <div className="flex items-center justify-between text-sm font-black text-blue-950 mb-1.5">
                <span>Cấp độ 2: Thông hiểu</span>
                <span className="text-base font-extrabold">
                  {result.levelBreakdown.thong_hieu.correct} / {result.levelBreakdown.thong_hieu.total}
                </span>
              </div>
              <div className="w-full bg-blue-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{
                    width: `${
                      result.levelBreakdown.thong_hieu.total > 0
                        ? (result.levelBreakdown.thong_hieu.correct / result.levelBreakdown.thong_hieu.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Vận dụng */}
            <div className="p-4 rounded-2xl bg-purple-100/80 border-2 border-purple-300">
              <div className="flex items-center justify-between text-sm font-black text-purple-950 mb-1.5">
                <span>Cấp độ 3: Vận dụng</span>
                <span className="text-base font-extrabold">
                  {result.levelBreakdown.van_dung.correct} / {result.levelBreakdown.van_dung.total}
                </span>
              </div>
              <div className="w-full bg-purple-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all"
                  style={{
                    width: `${
                      result.levelBreakdown.van_dung.total > 0
                        ? (result.levelBreakdown.van_dung.correct / result.levelBreakdown.van_dung.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Review Section */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-700" />
            <h3 className="font-black text-xl sm:text-2xl text-slate-900">
              Chi tiết câu hỏi & Lời giải bài học
            </h3>
          </div>

          {incorrectQuestions.length > 0 && (
            <button
              onClick={() => setFilterWrongOnly(!filterWrongOnly)}
              className={`px-4 py-2 rounded-xl text-sm font-extrabold flex items-center gap-2 border-2 transition-all cursor-pointer shadow-xs ${
                filterWrongOnly
                  ? 'bg-rose-100 border-rose-400 text-rose-900'
                  : 'bg-amber-100/90 border-amber-300 text-amber-950 hover:bg-amber-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Chỉ hiển thị {incorrectQuestions.length} câu làm sai</span>
            </button>
          )}
        </div>

        {/* Question Cards List - Colorful Cards */}
        <div className="space-y-4">
          {displayedQuestions.map((q, idx) => {
            const studentAnswer = userAnswers[q.id];
            const isCorrect = studentAnswer === q.correctAnswer;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className={`rounded-3xl border-2 transition-all p-5 sm:p-7 space-y-4 shadow-md ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-sky-50/90 border-emerald-300' 
                    : 'bg-gradient-to-r from-rose-50/95 via-amber-50/80 to-orange-50/90 border-rose-400'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="text-sm font-black text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
                          Câu {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 font-extrabold border border-sky-200">
                          {q.lessonTitle}
                        </span>
                        <span className={`text-xs sm:text-sm px-2.5 py-1 rounded-lg font-extrabold border ${
                          q.level === 'nhan_biet' 
                            ? 'bg-emerald-200 text-emerald-950 border-emerald-300' 
                            : q.level === 'thong_hieu' 
                            ? 'bg-blue-200 text-blue-950 border-blue-300' 
                            : 'bg-purple-200 text-purple-950 border-purple-300'
                        }`}>
                          {q.levelLabel}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-relaxed">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-base pl-9">
                  {q.options.map((opt, optIdx) => {
                    const letter = ['A', 'B', 'C', 'D'][optIdx];
                    const isSelected = studentAnswer === optIdx;
                    const isTargetCorrect = optIdx === q.correctAnswer;

                    let optClass = 'border-slate-300 bg-white/70 text-slate-700';
                    if (isTargetCorrect) {
                      optClass = 'border-2 border-emerald-500 bg-emerald-100/90 text-emerald-950 font-black shadow-xs';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'border-2 border-rose-500 bg-rose-100/90 text-rose-950 line-through font-bold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-center gap-3 ${optClass}`}
                      >
                        <span className="w-7 h-7 rounded-lg font-black flex items-center justify-center shrink-0 bg-white border border-slate-300 text-slate-900 text-sm shadow-xs">
                          {letter}
                        </span>
                        <span className="font-medium leading-snug">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                <div className="pl-9 pt-1">
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-100/70 border-2 border-amber-300/80 text-sm sm:text-base space-y-2">
                    <div className="font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-700" />
                      <span>Hướng dẫn giải & Trích dẫn SGK:</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {q.explanation}
                    </p>
                    <div className="text-xs sm:text-sm font-bold text-indigo-900 bg-indigo-100 border border-indigo-200 inline-block px-3 py-1 rounded-lg">
                      📖 {q.textbookReference}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
