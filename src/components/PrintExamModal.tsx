import React, { useState } from 'react';
import { Printer, X, CheckSquare, FileText, Download } from 'lucide-react';
import { Question, QuizFilterConfig } from '../types';

interface PrintExamModalProps {
  questions: Question[];
  config: QuizFilterConfig;
  onClose: () => void;
}

export const PrintExamModal: React.FC<PrintExamModalProps> = ({
  questions,
  config,
  onClose,
}) => {
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [schoolName, setSchoolName] = useState('TRƯỜNG THPT .................................');
  const [examTitle, setExamTitle] = useState(
    config.lessonId === 'bai-3'
      ? 'ĐỀ ÔN TẬP BÀI 3: CÔNG NGHỆ PHỔ BIẾN'
      : config.lessonId === 'bai-4'
      ? 'ĐỀ ÔN TẬP BÀI 4: MỘT SỐ CÔNG NGHỆ MỚI'
      : 'ĐỀ ÔN TẬP TỔNG HỢP: BÀI 3 & BÀI 4 CÔNG NGHỆ 10'
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-amber-50 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-3 border-indigo-300">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="p-4 sm:p-5 border-b-2 border-indigo-200 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-blue-800 via-indigo-800 to-sky-700 text-white rounded-t-3xl print:hidden shadow-md">
          <div className="flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-amber-300" />
            <h3 className="font-black text-white text-lg sm:text-xl">
              Xem Trước & In Đề Thi Ra Giấy (A4 / PDF)
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              <span>In Ngay (Print/PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Print Configuration Controls (hidden in print) */}
        <div className="p-4 bg-sky-100/90 border-b-2 border-sky-200 flex flex-wrap items-center gap-5 text-sm sm:text-base font-extrabold text-sky-950 print:hidden">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>In Bảng Đáp Án Trắc Nghiệm</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeExplanations}
              onChange={(e) => setIncludeExplanations(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>In Hướng Dẫn Giải Chi Tiết & Trích Dẫn SGK</span>
          </label>
        </div>

        {/* Printable Paper Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-900 bg-white print:p-0 print:overflow-visible print:bg-white" id="printable-exam">
          
          {/* Formal School Exam Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start text-sm sm:text-base font-bold">
              <div className="text-left space-y-1">
                <p className="uppercase font-black tracking-wide">{schoolName}</p>
                <p>TỔ CHUYÊN MÔN: CÔNG NGHỆ 10</p>
                <p className="font-extrabold text-blue-800">Tác giả: GV: Mai Thị Thuý Hằng</p>
                <p className="font-semibold text-slate-600">Năm học: 2026 - 2027</p>
              </div>

              <div className="text-right space-y-1">
                <p className="font-black uppercase tracking-wide">{examTitle}</p>
                <p className="font-bold text-slate-700">Thời gian làm bài: {questions.length * 1.5} phút</p>
                <p className="font-medium text-slate-600">(Đề gồm {questions.length} câu trắc nghiệm)</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-slate-400 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm font-semibold">
              <div>Họ và tên: ............................................</div>
              <div>Lớp: .....................</div>
              <div>Số báo danh: .............</div>
              <div>Điểm số: ..................</div>
            </div>
          </div>

          {/* Exam Questions List */}
          <div className="space-y-6 text-base">
            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-2.5 break-inside-avoid">
                <p className="font-black text-slate-900 leading-snug">
                  <span>Câu {idx + 1}: </span>
                  <span className="font-bold">{q.question}</span>
                  <span className="text-xs text-indigo-700 font-extrabold ml-2 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    [{q.levelLabel}]
                  </span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-4 text-slate-800 font-medium">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-2">
                      <span className="font-black text-slate-900">{['A.', 'B.', 'C.', 'D.'][oIdx]}</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Student Answer Sheet Grid (for paper test) */}
          <div className="mt-8 pt-6 border-t-2 border-slate-400 break-inside-avoid">
            <h4 className="text-center font-black uppercase text-sm tracking-wider mb-3 text-slate-900">
              PHIẾU TRẢ LỜI TRẮC NGHIỆM CỦA HỌC SINH
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-xs text-center">
              {questions.map((_, idx) => (
                <div key={idx} className="border-2 border-slate-300 p-1.5 rounded-lg bg-slate-50">
                  <div className="font-black text-slate-800 mb-0.5 text-sm">{idx + 1}</div>
                  <div className="text-[11px] text-slate-500 font-bold tracking-tight">A B C D</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Answer Key (Optional) */}
          {includeAnswers && (
            <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-400 break-before-page">
              <h4 className="font-black text-base uppercase text-slate-900 mb-3 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" />
                <span>BẢNG ĐÁP ÁN CHÍNH THỨC</span>
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-xs text-center mb-6">
                {questions.map((q, idx) => (
                  <div key={q.id} className="border-2 border-emerald-400 bg-emerald-50 p-2 rounded-xl">
                    <div className="font-bold text-slate-700">Câu {idx + 1}</div>
                    <div className="font-black text-emerald-800 text-base">
                      {['A', 'B', 'C', 'D'][q.correctAnswer]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Explanations (Optional) */}
          {includeExplanations && (
            <div className="mt-6 pt-4 border-t-2 border-slate-300 break-inside-avoid space-y-3">
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-800">
                HƯỚNG DẪN GIẢI CHI TIẾT & TRÍCH DẪN SÁCH GIÁO KHOA
              </h4>
              <div className="space-y-3 text-sm leading-relaxed">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-sky-50/70 rounded-xl border border-sky-200">
                    <p className="font-black text-slate-900 text-base">
                      Câu {idx + 1}: Đáp án {['A', 'B', 'C', 'D'][q.correctAnswer]}
                    </p>
                    <p className="text-slate-800 mt-1 font-medium">{q.explanation}</p>
                    <p className="text-blue-800 font-bold mt-1.5">📖 {q.textbookReference}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
