import React from 'react';
import { BookOpen, Sparkles, Layers, FileText, CheckCircle2, History } from 'lucide-react';

interface HeaderProps {
  activeTab: 'quiz' | 'flashcards' | 'summary' | 'history';
  onTabChange: (tab: 'quiz' | 'flashcards' | 'summary' | 'history') => void;
  isTakingQuiz: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, isTakingQuiz }) => {
  return (
    <header className="bg-gradient-to-r from-blue-800 via-indigo-800 to-sky-700 text-white border-b-3 border-amber-400/50 sticky top-0 z-40 shadow-lg shadow-indigo-950/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => onTabChange('quiz')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-400/30 shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-lg sm:text-2xl text-amber-300 tracking-tight uppercase drop-shadow-xs">
                  GIA SƯ ôn tập công nghệ 10 bài 3,4
                </span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-sky-200 tracking-wide flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Tác giả: GV: Mai Thị Thuý Hằng
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {!isTakingQuiz && (
            <nav className="flex items-center gap-1.5 sm:gap-2.5">
              <button
                onClick={() => onTabChange('quiz')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'quiz' ? 'text-slate-950' : 'text-amber-300'}`} />
                <span>Tạo Đề Ôn Tập</span>
              </button>

              <button
                onClick={() => onTabChange('flashcards')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all cursor-pointer ${
                  activeTab === 'flashcards'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                <Layers className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'flashcards' ? 'text-slate-950' : 'text-sky-300'}`} />
                <span className="hidden sm:inline">Thẻ Ghi Nhớ</span>
                <span className="sm:hidden">Thẻ</span>
              </button>

              <button
                onClick={() => onTabChange('summary')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all cursor-pointer ${
                  activeTab === 'summary'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                <FileText className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'summary' ? 'text-slate-950' : 'text-emerald-300'}`} />
                <span className="hidden sm:inline">Tóm Tắt SGK</span>
                <span className="sm:hidden">SGK</span>
              </button>

              <button
                onClick={() => onTabChange('history')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                <History className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'history' ? 'text-slate-950' : 'text-orange-300'}`} />
                <span className="hidden md:inline">Lịch Sử Làm Bài</span>
                <span className="md:hidden">Lịch sử</span>
              </button>
            </nav>
          )}

          {isTakingQuiz && (
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-black text-slate-950 bg-amber-400 px-4 py-2 rounded-xl shadow-md border-2 border-amber-300 animate-pulse">
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>ĐANG LÀM BÀI</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
