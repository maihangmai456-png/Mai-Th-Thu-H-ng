import React from 'react';
import { BookOpen, Sparkles, Layers, FileText, CheckCircle2, History } from 'lucide-react';

interface HeaderProps {
  activeTab: 'quiz' | 'flashcards' | 'summary' | 'history';
  onTabChange: (tab: 'quiz' | 'flashcards' | 'summary' | 'history') => void;
  isTakingQuiz: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, isTakingQuiz }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onTabChange('quiz')}
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight uppercase">
                  GIA SƯ ôn tập công nghệ 10 bài 3,4
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-700">
                Tác giả: GV: Mai Thị Thuý Hằng
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {!isTakingQuiz && (
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => onTabChange('quiz')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Tạo Đề Ôn Tập</span>
              </button>

              <button
                onClick={() => onTabChange('flashcards')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'flashcards'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Thẻ Ghi Nhớ</span>
                <span className="sm:hidden">Thẻ</span>
              </button>

              <button
                onClick={() => onTabChange('summary')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'summary'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Tóm Tắt SGK</span>
                <span className="sm:hidden">SGK</span>
              </button>

              <button
                onClick={() => onTabChange('history')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">Lịch Sử Làm Bài</span>
                <span className="md:hidden">Lịch sử</span>
              </button>
            </nav>
          )}

          {isTakingQuiz && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-800">Đang trong bài làm</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
