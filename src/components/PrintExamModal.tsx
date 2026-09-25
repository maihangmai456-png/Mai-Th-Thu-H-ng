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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50 rounded-t-2xl print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Xem Trước & In Đề Thi Ra Giấy (A4 / PDF)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In Ngay (Print/PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print Configuration Controls (hidden in print) */}
        <div className="p-4 bg-blue-50/60 border-b border-blue-100 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 print:hidden">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>In Bảng Đáp Án Trắc Nghiệm</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeExplanations}
              onChange={(e) => setIncludeExplanations(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>In Hướng Dẫn Giải Chi Tiết & Trích Dẫn SGK</span>
          </label>
        </div>

        {/* Printable Paper Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-900 print:p-0 print:overflow-visible" id="printable-exam">
          
          {/* Formal School Exam Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start text-xs sm:text-sm font-semibold">
              <div className="text-left space-y-1">
                <p className="uppercase font-bold tracking-wide">{schoolName}</p>
                <p>TỔ CHUYÊN MÔN: CÔNG NGHỆ 10</p>
                <p className="font-semibold text-blue-700">Tác giả: GV: Mai Thị Thuý Hằng</p>
                <p className="font-normal text-slate-600">Năm học: 2026 - 2027</p>
              </div>

              <div className="text-right space-y-1">
                <p className="font-bold uppercase tracking-wide">{examTitle}</p>
                <p className="font-normal text-slate-600">Thời gian làm bài: {questions.length * 1.5} phút</p>
                <p className="font-normal text-slate-600">(Đề gồm {questions.length} câu trắc nghiệm)</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>Họ và tên: ............................................</div>
              <div>Lớp: .....................</div>
              <div>Số báo danh: .............</div>
              <div>Điểm số: ..................</div>
            </div>
          </div>

          {/* Exam Questions List */}
          <div className="space-y-5 text-sm">
            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-2 break-inside-avoid">
                <p className="font-bold text-slate-900 leading-snug">
                  <span>Câu {idx + 1}: </span>
                  <span className="font-normal">{q.question}</span>
                  <span className="text-xs text-slate-400 font-normal ml-2">
                    [{q.levelLabel}]
                  </span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pl-4 text-slate-800">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-1.5">
                      <span className="font-bold">{['A.', 'B.', 'C.', 'D.'][oIdx]}</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Student Answer Sheet Grid (for paper test) */}
          <div className="mt-8 pt-6 border-t-2 border-slate-300 break-inside-avoid">
            <h4 className="text-center font-bold uppercase text-xs tracking-wider mb-3">
              PHIẾU TRẢ LỜI TRẮC NGHIỆM CỦA HỌC SINH
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-xs text-center">
              {questions.map((_, idx) => (
                <div key={idx} className="border border-slate-300 p-1 rounded bg-slate-50">
                  <div className="font-bold text-slate-600 mb-0.5">{idx + 1}</div>
                  <div className="text-[10px] text-slate-400 tracking-tighter">A B C D</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Answer Key (Optional) */}
          {includeAnswers && (
            <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-400 break-before-page">
              <h4 className="font-bold text-sm uppercase text-slate-900 mb-3 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>BẢNG ĐÁP ÁN CHÍNH THỨC</span>
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-xs text-center mb-6">
                {questions.map((q, idx) => (
                  <div key={q.id} className="border border-emerald-300 bg-emerald-50/60 p-1.5 rounded">
                    <div className="font-medium text-slate-600">Câu {idx + 1}</div>
                    <div className="font-bold text-emerald-700 text-sm">
                      {['A', 'B', 'C', 'D'][q.correctAnswer]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Explanations (Optional) */}
          {includeExplanations && (
            <div className="mt-6 pt-4 border-t border-slate-200 break-inside-avoid space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600">
                HƯỚNG DẪN GIẢI CHI TIẾT & TRÍCH DẪN SÁCH GIÁO KHOA
              </h4>
              <div className="space-y-3 text-xs leading-relaxed">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-800">
                      Câu {idx + 1}: Đáp án {['A', 'B', 'C', 'D'][q.correctAnswer]}
                    </p>
                    <p className="text-slate-600 mt-1">{q.explanation}</p>
                    <p className="text-blue-700 font-medium mt-1">📖 {q.textbookReference}</p>
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
