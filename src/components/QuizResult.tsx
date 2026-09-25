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
  ArrowRight
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
        particleCount: 80,
        spread: 70,
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
      {/* Score Summary Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center font-black shadow-md ${
              result.score >= 8
                ? 'bg-linear-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/20'
                : result.score >= 5
                ? 'bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
                : 'bg-linear-to-tr from-amber-600 to-orange-500 text-white shadow-amber-500/20'
            }`}>
              <span className="text-3xl sm:text-4xl">{result.score}</span>
              <span className="text-xs uppercase font-semibold tracking-wider opacity-85">/ 10 điểm</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  result.rating === 'Xuất sắc' || result.rating === 'Giỏi'
                    ? 'bg-emerald-100 text-emerald-800'
                    : result.rating === 'Khá'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  ★ Đạt xếp loại: {result.rating}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(result.timeSpentSeconds)}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Đúng {result.correctAnswers} / {result.totalQuestions} câu ({result.percentage}%)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {result.score >= 8
                  ? 'Tuyệt vời! Em đã nắm rất vững kiến thức công nghệ phổ biến và các công nghệ mới.'
                  : result.score >= 5
                  ? 'Khá tốt! Em hãy rà soát lại các câu sai để ghi nhớ sâu hơn các chi tiết SGK.'
                  : 'Cần ôn lại thêm bài học và thử lại để cải thiện kết quả nhé!'}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto">
            {incorrectQuestions.length > 0 && (
              <button
                onClick={() => onRetryIncorrect(incorrectQuestions)}
                className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại {incorrectQuestions.length} câu sai</span>
              </button>
            )}

            <button
              onClick={onNewQuiz}
              className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tạo đề ôn tập mới</span>
            </button>

            <button
              onClick={onPrintExam}
              className="flex-1 md:flex-none py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>In đáp án & lời giải</span>
            </button>
          </div>
        </div>

        {/* Cognitive Level Breakdown Grid */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Phân tích năng lực theo 3 Cấp độ nhận thức
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Nhận biết */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
                <span>Cấp độ 1: Nhận biết</span>
                <span>
                  {result.levelBreakdown.nhan_biet.correct} / {result.levelBreakdown.nhan_biet.total}
                </span>
              </div>
              <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
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
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-1">
                <span>Cấp độ 2: Thông hiểu</span>
                <span>
                  {result.levelBreakdown.thong_hieu.correct} / {result.levelBreakdown.thong_hieu.total}
                </span>
              </div>
              <div className="w-full bg-blue-200/60 h-2 rounded-full overflow-hidden">
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
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200">
              <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
                <span>Cấp độ 3: Vận dụng</span>
                <span>
                  {result.levelBreakdown.van_dung.correct} / {result.levelBreakdown.van_dung.total}
                </span>
              </div>
              <div className="w-full bg-purple-200/60 h-2 rounded-full overflow-hidden">
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
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-slate-900">
              Chi tiết câu hỏi & Lời giải bài học
            </h3>
          </div>

          {incorrectQuestions.length > 0 && (
            <button
              onClick={() => setFilterWrongOnly(!filterWrongOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                filterWrongOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Chỉ hiển thị {incorrectQuestions.length} câu làm sai</span>
            </button>
          )}
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {displayedQuestions.map((q, idx) => {
            const studentAnswer = userAnswers[q.id];
            const isCorrect = studentAnswer === q.correctAnswer;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all bg-white p-5 sm:p-6 space-y-4 ${
                  isCorrect ? 'border-slate-200' : 'border-rose-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-blue-700">
                          Câu {idx + 1}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {q.lessonTitle}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          q.level === 'nhan_biet' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : q.level === 'thong_hieu' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {q.levelLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pl-8">
                  {q.options.map((opt, optIdx) => {
                    const letter = ['A', 'B', 'C', 'D'][optIdx];
                    const isSelected = studentAnswer === optIdx;
                    const isTargetCorrect = optIdx === q.correctAnswer;

                    let optClass = 'border-slate-200 bg-slate-50/50 text-slate-600';
                    if (isTargetCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border flex items-center gap-2 ${optClass}`}
                      >
                        <span className="w-5 h-5 rounded font-bold flex items-center justify-center shrink-0 bg-white border border-slate-200 text-slate-800">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                <div className="pl-8 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1.5">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Hướng dẫn giải & Trích dẫn SGK:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-normal">
                      {q.explanation}
                    </p>
                    <div className="text-xs font-semibold text-blue-700 bg-blue-100/60 inline-block px-2 py-0.5 rounded">
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
