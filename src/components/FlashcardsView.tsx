import React, { useState } from 'react';
import { FLASHCARDS } from '../data/lessonsData';
import { Flashcard, LessonId } from '../types';
import { Layers, RotateCw, ChevronLeft, ChevronRight, CheckCircle, BookOpen, Lightbulb } from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonId>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  const filteredCards = FLASHCARDS.filter((c) => {
    if (selectedLesson === 'all') return true;
    return c.lessonId === selectedLesson;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (cardId: string) => {
    setMasteredCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const masteredCount = filteredCards.filter((c) => masteredCards[c.id]).length;

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* Title & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Ôn Nhanh Kiến Thức Trọng Tâm</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Thẻ Ghi Nhớ (Flashcards)
          </h2>
          <p className="text-xs text-slate-500">
            Lật thẻ để ôn nhanh định nghĩa, phân loại và ứng dụng cốt lõi của Bài 3 & Bài 4
          </p>
        </div>

        {/* Lesson Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => {
              setSelectedLesson('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLesson === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả ({FLASHCARDS.length})
          </button>
          <button
            onClick={() => {
              setSelectedLesson('bai-3');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLesson === 'bai-3'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bài 3 (7 thẻ)
          </button>
          <button
            onClick={() => {
              setSelectedLesson('bai-4');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLesson === 'bai-4'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bài 4 (5 thẻ)
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Thẻ {currentIndex + 1} / {filteredCards.length}
        </span>
        <span>
          Đã nhớ: <strong className="text-emerald-600 font-bold">{masteredCount}</strong> / {filteredCards.length}
        </span>
      </div>

      {/* Flashcard Area */}
      {currentCard && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative min-h-[320px] rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-md select-none ${
            isFlipped
              ? 'bg-indigo-950 text-white border-indigo-700 shadow-indigo-900/20'
              : 'bg-white text-slate-900 border-slate-200/90 hover:border-indigo-400'
          }`}
        >
          {/* Top Info */}
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
              isFlipped 
                ? 'bg-indigo-900 text-indigo-200' 
                : 'bg-slate-100 text-slate-700'
            }`}>
              {currentCard.topic}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentCard.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                masteredCards[currentCard.id]
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : isFlipped
                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{masteredCards[currentCard.id] ? 'Đã thuộc' : 'Chưa thuộc'}</span>
            </button>
          </div>

          {/* Card Main Body */}
          <div className="py-6 text-center space-y-4">
            {!isFlipped ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-relaxed px-4">
                  {currentCard.front}
                </h3>
                <p className="text-xs text-slate-400">
                  Nhấn chuột hoặc chạm vào thẻ để xem đáp án
                </p>
              </>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg sm:text-xl font-bold text-amber-300 leading-snug">
                  {currentCard.back}
                </h3>
                <div className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-lg mx-auto whitespace-pre-line text-left bg-white/5 p-4 rounded-2xl border border-white/10">
                  {currentCard.detail}
                </div>

                {/* Key terms pills */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {currentCard.keyTerms.map((term, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 font-medium">
                      #{term}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Flip Hint */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold opacity-60">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Lật mặt sau</span>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Thẻ trước</span>
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>Lật thẻ</span>
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Thẻ tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
