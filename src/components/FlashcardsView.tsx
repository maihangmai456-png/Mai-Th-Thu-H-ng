import React, { useState } from 'react';
import { FLASHCARDS } from '../data/lessonsData';
import { Flashcard, LessonId } from '../types';
import { Layers, RotateCw, ChevronLeft, ChevronRight, CheckCircle, BookOpen, Lightbulb, Sparkles } from 'lucide-react';

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
          <div className="flex items-center gap-2 text-indigo-700 font-black text-sm uppercase tracking-wider mb-1">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Ôn Nhanh Kiến Thức Trọng Tâm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Thẻ Ghi Nhớ (Flashcards)
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-medium">
            Lật thẻ để ghi nhớ các khái niệm cốt lõi của Bài 3 & Bài 4 SGK Công nghệ 10
          </p>
        </div>

        {/* Lesson Filter */}
        <div className="flex items-center gap-2 bg-indigo-100/90 p-1.5 rounded-2xl border-2 border-indigo-200">
          <button
            onClick={() => {
              setSelectedLesson('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedLesson === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-indigo-900 hover:bg-white/60'
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
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedLesson === 'bai-3'
                ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md'
                : 'text-indigo-900 hover:bg-white/60'
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
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedLesson === 'bai-4'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-indigo-900 hover:bg-white/60'
            }`}
          >
            Bài 4 (5 thẻ)
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-sm sm:text-base text-slate-700 font-bold px-1">
        <span className="bg-sky-100 border border-sky-300 px-3 py-1 rounded-xl text-sky-950 font-black">
          Thẻ {currentIndex + 1} / {filteredCards.length}
        </span>
        <span className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl text-emerald-950 font-black">
          Đã thuộc: <strong className="text-emerald-700">{masteredCount}</strong> / {filteredCards.length}
        </span>
      </div>

      {/* Flashcard Area - Vibrant non-white background */}
      {currentCard && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative min-h-[360px] rounded-3xl p-8 sm:p-10 border-3 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xl select-none ${
            isFlipped
              ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white border-amber-400 shadow-indigo-950/40'
              : 'bg-gradient-to-br from-amber-100 via-sky-100 to-indigo-100 text-slate-900 border-indigo-300 hover:border-indigo-500 shadow-lg'
          }`}
        >
          {/* Top Info */}
          <div className="flex items-center justify-between">
            <span className={`text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border ${
              isFlipped 
                ? 'bg-indigo-900/80 text-amber-300 border-indigo-700' 
                : 'bg-white/80 text-indigo-900 border-indigo-200 shadow-xs'
            }`}>
              {currentCard.topic}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentCard.id);
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                masteredCards[currentCard.id]
                  ? 'bg-emerald-500 text-white shadow-md'
                  : isFlipped
                  ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-300'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{masteredCards[currentCard.id] ? '✓ Đã thuộc' : '○ Chưa thuộc'}</span>
            </button>
          </div>

          {/* Card Main Body */}
          <div className="py-6 text-center space-y-4">
            {!isFlipped ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-500/30">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black leading-snug px-2 text-slate-950">
                  {currentCard.front}
                </h3>
                <p className="text-sm font-bold text-indigo-800 flex items-center justify-center gap-1.5">
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span>Nhấn vào thẻ để lật xem lời giải chi tiết</span>
                </p>
              </>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-black text-amber-300 leading-snug">
                  {currentCard.back}
                </h3>
                <div className="text-sm sm:text-base text-indigo-100 font-medium leading-relaxed max-w-xl mx-auto whitespace-pre-line text-left bg-white/10 p-5 rounded-2xl border border-white/15">
                  {currentCard.detail}
                </div>

                {/* Key terms pills */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {currentCard.keyTerms.map((term, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs sm:text-sm bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold">
                      #{term}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Flip Hint */}
          <div className={`flex items-center justify-center gap-2 text-xs sm:text-sm font-black ${
            isFlipped ? 'text-amber-300/80' : 'text-indigo-900/80'
          }`}>
            <RotateCw className="w-4 h-4" />
            <span>{isFlipped ? 'Nhấn để quay lại mặt trước' : 'Nhấn để lật xem đáp án'}</span>
          </div>
        </div>
      )}

      {/* Navigation Controls - Bright Colorful Buttons */}
      <div className="flex items-center justify-between pt-3">
        <button
          onClick={handlePrev}
          className="px-5 py-3 rounded-2xl border-2 border-indigo-300 bg-gradient-to-r from-amber-100 to-sky-100 hover:from-amber-200 hover:to-sky-200 text-indigo-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-indigo-700" />
          <span>Thẻ trước</span>
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-indigo-600/30 transition-all active:scale-98 cursor-pointer"
        >
          <RotateCw className="w-5 h-5" />
          <span>Lật thẻ</span>
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-3 rounded-2xl border-2 border-indigo-300 bg-gradient-to-r from-sky-100 to-indigo-100 hover:from-sky-200 hover:to-indigo-200 text-indigo-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
        >
          <span>Thẻ tiếp theo</span>
          <ChevronRight className="w-5 h-5 text-indigo-700" />
        </button>
      </div>
    </div>
  );
};
