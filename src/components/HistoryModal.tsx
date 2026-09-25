import React from 'react';
import { History, Trash2, Award, Clock, ArrowRight } from 'lucide-react';
import { ExamResult } from '../types';

export interface HistoryItem {
  id: string;
  date: string;
  lessonTitle: string;
  levelTitle: string;
  result: ExamResult;
}

interface HistoryModalProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  history,
  onClearHistory,
  onClose,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            <span>Hồ Sơ Học Tập Của Em</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Lịch Sử Làm Bài & Tiến Độ Ôn Tập
          </h2>
          <p className="text-xs text-slate-500">
            Theo dõi kết quả các bài kiểm tra đã hoàn thành để biết sự tiến bộ
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa lịch sử</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-base">Chưa có lịch sử làm bài</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Sau khi em hoàn thành một bài ôn tập hoặc thi thử, kết quả và phân tích chi tiết sẽ được tự động lưu tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.lessonTitle}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {item.levelTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.result.totalQuestions} câu hỏi</span>
                  <span>•</span>
                  <span>{Math.round(item.result.timeSpentSeconds / 60)} phút</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-black text-blue-600">
                    {item.result.score} <span className="text-xs text-slate-400 font-normal">/ 10đ</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500">
                    Đúng {item.result.correctAnswers}/{item.result.totalQuestions} ({item.result.percentage}%)
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  item.result.score >= 8
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.result.score >= 5
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.result.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
