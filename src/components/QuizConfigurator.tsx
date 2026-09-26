import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  ListOrdered, 
  Sparkles, 
  Printer, 
  Play, 
  Zap, 
  Check, 
  Flame, 
  BrainCircuit, 
  Compass, 
  Clock, 
  HelpCircle,
  Cpu,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { LESSONS } from '../data/lessonsData';
import { BUILTIN_QUESTIONS } from '../data/questionBank';
import { LessonId, DifficultyLevel, QuizFilterConfig } from '../types';

interface QuizConfiguratorProps {
  onStartQuiz: (config: QuizFilterConfig) => void;
  onOpenPrintModal: (config: QuizFilterConfig) => void;
  isLoadingAI: boolean;
}

export const QuizConfigurator: React.FC<QuizConfiguratorProps> = ({
  onStartQuiz,
  onOpenPrintModal,
  isLoadingAI,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<LessonId>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('tong_hop');
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [customNumInput, setCustomNumInput] = useState<string>('');
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [useAI, setUseAI] = useState<boolean>(false);
  const [customTopicNote, setCustomTopicNote] = useState<string>('');

  const questionPresets = [5, 10, 15, 20, 25];

  // Calculate available built-in questions for currently chosen filter
  const availableCount = BUILTIN_QUESTIONS.filter((q) => {
    const matchLesson = selectedLesson === 'all' || q.lessonId === selectedLesson;
    const matchLevel = selectedLevel === 'tong_hop' || q.level === selectedLevel;
    return matchLesson && matchLevel;
  }).length;

  const handleStart = () => {
    onStartQuiz({
      lessonId: selectedLesson,
      level: selectedLevel,
      numQuestions,
      mode: quizMode,
      useAI,
      customTopicNote: customTopicNote.trim(),
    });
  };

  const handlePrint = () => {
    onOpenPrintModal({
      lessonId: selectedLesson,
      level: selectedLevel,
      numQuestions,
      mode: quizMode,
      useAI,
      customTopicNote: customTopicNote.trim(),
    });
  };

  const handleCustomNumberChange = (val: string) => {
    setCustomNumInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) {
      setNumQuestions(parsed);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Hero Banner with Vibrant Colors */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-800 via-indigo-700 to-sky-700 text-white p-7 sm:p-10 shadow-2xl shadow-indigo-900/30 border-3 border-amber-400/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3 text-amber-300 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Hệ Thống Ôn Tập & Kiểm Tra Trắc Nghiệm Thông Minh
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 leading-tight uppercase text-white drop-shadow-md">
            GIA SƯ ÔN TẬP CÔNG NGHỆ 10 BÀI 3, 4
          </h1>
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-2 rounded-2xl text-base sm:text-lg font-black shadow-lg shadow-amber-400/30 mb-4 border-2 border-amber-300">
            <GraduationCap className="w-5 h-5 text-slate-950" />
            <span>Tác giả: GV: Mai Thị Thuý Hằng</span>
          </div>
          <p className="text-sky-100 text-base sm:text-lg leading-relaxed mb-5 font-medium">
            Tùy biến bài học (Bài 3 & Bài 4 SGK Kết nối tri thức), số lượng câu hỏi và 3 cấp độ nhận thức 
            <span className="font-black text-amber-300"> (Nhận biết, Thông hiểu, Vận dụng và Tổng hợp)</span>. 
            Hỗ trợ làm bài trắc nghiệm tương tác hoặc xuất đề thi ra giấy kèm đáp án chi tiết.
          </p>
          <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm font-bold text-white">
            <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">✓ Bài 3: Công nghệ phổ biến (10 mục)</span>
            <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">✓ Bài 4: Một số công nghệ mới (7 mục)</span>
            <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">✓ Đáp án & Trích dẫn trang SGK</span>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-6 -bottom-10 opacity-20 pointer-events-none">
          <BrainCircuit className="w-88 h-88 text-white" />
        </div>
      </div>

      {/* Main Settings Card - Vibrant Warm Tinted Background (No stark white!) */}
      <div className="bg-gradient-to-br from-amber-50/95 via-sky-50/95 to-indigo-50/95 rounded-3xl border-3 border-indigo-200/90 shadow-xl p-6 sm:p-9 space-y-9">
        
        {/* STEP 1: CHỌN BÀI HỌC */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-base font-black shadow-md">
                1
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Học sinh chọn Bài học</h2>
                <p className="text-sm font-medium text-slate-700">Chọn một bài cụ thể hoặc tổng hợp cả hai bài học</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-extrabold px-3 py-1.5 bg-blue-100 text-blue-800 rounded-xl border border-blue-200 shadow-xs">
              SGK Kết nối tri thức
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {LESSONS.map((lesson) => {
              const isSelected = selectedLesson === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id)}
                  className={`group relative rounded-2xl p-6 border-3 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-gradient-to-br from-sky-100 to-blue-100 shadow-xl shadow-blue-500/15 scale-101'
                      : 'border-slate-300 bg-white/80 hover:border-blue-400 hover:bg-sky-50/90 shadow-xs'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                        isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-200/80 text-slate-800'
                      }`}>
                        {lesson.code}
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-black text-slate-950 text-lg sm:text-xl group-hover:text-blue-700 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-700 line-clamp-2 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-300/80 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
                    <span>{lesson.pages}</span>
                    <span className="font-extrabold text-blue-800 bg-blue-200/70 px-2.5 py-1 rounded-lg">
                      {lesson.topicsCount} chuyên đề
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: CHỌN CẤP ĐỘ NHẬN THỨC (3 CẤP ĐỘ + TỔNG HỢP) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-base font-black shadow-md">
                2
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Chọn Cấp độ nhận thức</h2>
                <p className="text-sm font-medium text-slate-700">3 cấp độ tư duy sư phạm hoặc Đề thi tổng hợp cả 3 cấp độ</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-indigo-700 font-extrabold bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200">
              <Info className="w-4 h-4" />
              <span>Thang tư duy Bloom</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cấp độ 1: Nhận biết */}
            <div
              onClick={() => setSelectedLevel('nhan_biet')}
              className={`p-5 rounded-2xl border-3 cursor-pointer transition-all ${
                selectedLevel === 'nhan_biet'
                  ? 'border-emerald-600 bg-emerald-100 shadow-lg shadow-emerald-600/20 scale-102 ring-2 ring-emerald-500'
                  : 'border-emerald-300/80 bg-emerald-50/70 hover:border-emerald-400 hover:bg-emerald-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  1
                </div>
                <span className="text-xs sm:text-sm font-extrabold px-2.5 py-1 rounded-lg bg-emerald-200 text-emerald-950">
                  Cơ bản
                </span>
              </div>
              <h4 className="font-black text-slate-950 text-base sm:text-lg">Cấp độ 1: Nhận biết</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1.5 leading-relaxed">
                Ghi nhớ định nghĩa, thuật ngữ, từ viết tắt, mốc thời gian, tên gọi công nghệ.
              </p>
            </div>

            {/* Cấp độ 2: Thông hiểu */}
            <div
              onClick={() => setSelectedLevel('thong_hieu')}
              className={`p-5 rounded-2xl border-3 cursor-pointer transition-all ${
                selectedLevel === 'thong_hieu'
                  ? 'border-sky-600 bg-sky-100 shadow-lg shadow-sky-600/20 scale-102 ring-2 ring-sky-500'
                  : 'border-sky-300/80 bg-sky-50/70 hover:border-sky-400 hover:bg-sky-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  2
                </div>
                <span className="text-xs sm:text-sm font-extrabold px-2.5 py-1 rounded-lg bg-sky-200 text-sky-950">
                  Trung bình
                </span>
              </div>
              <h4 className="font-black text-slate-950 text-base sm:text-lg">Cấp độ 2: Thông hiểu</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1.5 leading-relaxed">
                Hiểu nguyên lý, so sánh phân biệt, giải thích bản chất quy trình công nghệ.
              </p>
            </div>

            {/* Cấp độ 3: Vận dụng */}
            <div
              onClick={() => setSelectedLevel('van_dung')}
              className={`p-5 rounded-2xl border-3 cursor-pointer transition-all ${
                selectedLevel === 'van_dung'
                  ? 'border-purple-600 bg-purple-100 shadow-lg shadow-purple-600/20 scale-102 ring-2 ring-purple-500'
                  : 'border-purple-300/80 bg-purple-50/70 hover:border-purple-400 hover:bg-purple-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  3
                </div>
                <span className="text-xs sm:text-sm font-extrabold px-2.5 py-1 rounded-lg bg-purple-200 text-purple-950">
                  Nâng cao
                </span>
              </div>
              <h4 className="font-black text-slate-950 text-base sm:text-lg">Cấp độ 3: Vận dụng</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1.5 leading-relaxed">
                Tình huống thực tế, giải quyết vấn đề, ứng dụng trong sản xuất & đời sống.
              </p>
            </div>

            {/* Cấp độ Tổng hợp */}
            <div
              onClick={() => setSelectedLevel('tong_hop')}
              className={`p-5 rounded-2xl border-3 cursor-pointer transition-all ${
                selectedLevel === 'tong_hop'
                  ? 'border-amber-600 bg-amber-200 shadow-xl shadow-amber-600/25 scale-102 ring-2 ring-amber-500'
                  : 'border-amber-300/80 bg-amber-100/80 hover:border-amber-400 hover:bg-amber-150'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  ★
                </div>
                <span className="text-xs sm:text-sm font-black px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950">
                  Đề Chuẩn
                </span>
              </div>
              <h4 className="font-black text-slate-950 text-base sm:text-lg">Tổng hợp 3 Cấp độ</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-1.5 leading-relaxed">
                Trộn tỉ lệ ma trận: 40% Nhận biết, 40% Thông hiểu, 20% Vận dụng.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 3: CHỌN SỐ LƯỢNG CÂU HỎI */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center text-base font-black shadow-md">
                3
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Học sinh chọn Số câu hỏi</h2>
                <p className="text-sm font-medium text-slate-700">Chọn số câu nhanh hoặc nhập số lượng mong muốn</p>
              </div>
            </div>
            <span className="text-sm sm:text-base text-slate-700 font-bold bg-white/80 px-3.5 py-1.5 rounded-xl border border-slate-300 shadow-xs">
              Đang chọn: <strong className="text-blue-700 font-black text-base sm:text-lg">{numQuestions} câu</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {questionPresets.map((preset) => {
              const isSelected = numQuestions === preset && !customNumInput;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setNumQuestions(preset);
                    setCustomNumInput('');
                  }}
                  className={`px-5 py-3 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-blue-400'
                      : 'bg-white/90 border-2 border-slate-300 text-slate-800 hover:bg-sky-100 hover:border-blue-400'
                  }`}
                >
                  {preset} câu
                </button>
              );
            })}

            <div className="flex items-center gap-2.5 ml-auto bg-white/90 p-2 rounded-2xl border-2 border-slate-300 shadow-xs">
              <span className="text-xs sm:text-sm font-bold text-slate-700">Tùy chỉnh:</span>
              <input
                type="number"
                min="1"
                max="30"
                placeholder="vd: 8"
                value={customNumInput}
                onChange={(e) => handleCustomNumberChange(e.target.value)}
                className="w-20 px-3 py-2 text-base font-black border-2 border-blue-400 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-center bg-sky-50 text-slate-900"
              />
              <span className="text-xs sm:text-sm font-bold text-slate-700">câu</span>
            </div>
          </div>
        </div>

        {/* STEP 4: CHẾ ĐỘ LÀM BÀI & NGUỒN CÂU HỎI */}
        <div className="pt-3 border-t-2 border-slate-300/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chế độ thi */}
            <div>
              <label className="block text-base font-black text-slate-950 mb-2.5">
                Chế độ làm bài
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setQuizMode('practice')}
                  className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                    quizMode === 'practice'
                      ? 'border-blue-600 bg-blue-100 text-blue-950 font-black shadow-md'
                      : 'border-slate-300 bg-white/80 text-slate-800 hover:bg-sky-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Compass className="w-5 h-5 text-blue-700" />
                    <span className="text-base font-black">Luyện tập</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Xem đáp án & giải thích SGK ngay sau mỗi câu trả lời.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setQuizMode('exam')}
                  className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                    quizMode === 'exam'
                      ? 'border-indigo-600 bg-indigo-100 text-indigo-950 font-black shadow-md'
                      : 'border-slate-300 bg-white/80 text-slate-800 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-5 h-5 text-indigo-700" />
                    <span className="text-base font-black">Thi thử</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Đếm ngược thời gian, nộp bài tính điểm 10 & xếp loại.
                  </p>
                </button>
              </div>
            </div>

            {/* Nguồn đề: Chuẩn SGK vs AI Gemini */}
            <div>
              <label className="block text-base font-black text-slate-950 mb-2.5">
                Bộ tạo câu hỏi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUseAI(false)}
                  className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                    !useAI
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-950 font-black shadow-md'
                      : 'border-slate-300 bg-white/80 text-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap className="w-5 h-5 text-emerald-700" />
                    <span className="text-base font-black">Kho Chuẩn SGK</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Biên soạn sẵn, mở làm ngay tức thì không cần chờ đợi.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setUseAI(true)}
                  className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                    useAI
                      ? 'border-purple-600 bg-purple-100 text-purple-950 font-black shadow-md'
                      : 'border-slate-300 bg-white/80 text-slate-800 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-5 h-5 text-purple-700" />
                    <span className="text-base font-black">Sinh Đề Bằng AI</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Gemini sinh đề mới lạ, sáng tạo tình huống phong phú.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* AI Custom prompt optional */}
          {useAI && (
            <div className="mt-4 p-4 rounded-2xl bg-purple-100 border-2 border-purple-300">
              <label className="block text-sm font-bold text-purple-950 mb-1.5">
                Yêu cầu bổ sung cho AI (tùy chọn):
              </label>
              <input
                type="text"
                placeholder="Ví dụ: 'Tập trung nhiều câu hỏi về công nghệ in 3D và IoT' hoặc 'Thêm tình huống thực tế nông thôn'..."
                value={customTopicNote}
                onChange={(e) => setCustomTopicNote(e.target.value)}
                className="w-full text-sm font-medium px-4 py-2.5 rounded-xl border border-purple-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* ACTION BUTTONS - Big, Cheerful, Vibrant */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={handleStart}
            disabled={isLoadingAI}
            className="w-full sm:flex-1 py-4.5 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 active:scale-98 text-white font-black text-lg sm:text-xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoadingAI ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>AI Gemini đang biên soạn đề...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current" />
                <span>Bắt Đầu Làm Bài ({numQuestions} câu)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isLoadingAI}
            className="w-full sm:w-auto py-4.5 px-7 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-amber-400/25 border-2 border-amber-300 disabled:opacity-50"
          >
            <Printer className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            <span>Xuất Đề & In Ra Giấy (PDF)</span>
          </button>
        </div>

      </div>

      {/* Quick Summary Cards of Lessons - Colorful Tinted Cards (Not white) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-100/90 to-sky-100/90 border-2 border-blue-300 shadow-md flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-950 text-base sm:text-lg mb-1.5">
              Bài 3: Công nghệ phổ biến (Trang 14-22)
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              Luyện kim (lò cao gang thép, kim loại màu), Đúc kim loại (ly tâm, áp lực), Cắt gọt (tiện, phay, bào, mài), Áp lực (cán, kéo, rèn, dập), Hàn (hồ quang, MAG), Sản xuất điện, Điện - Quang (LED, sợi đốt), Điện - Cơ (quay, tịnh tiến - relay 1835), Tự động hoá & Truyền thông không dây.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-100/90 to-indigo-100/90 border-2 border-purple-300 shadow-md flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-950 text-base sm:text-lg mb-1.5">
              Bài 4: Một số công nghệ mới (Trang 23-28)
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              Công nghệ nano (1-100nm, tiêu diệt tế bào ung thư, vải nano bạc kháng khuẩn), CAD/CAM/CNC (chuỗi liên hoàn thiết kế - lập trình - gia công), In 3D (đắp lớp tuần tự), Năng lượng tái tạo, AI mô phỏng trí tuệ, IoT (Kevin Ashton 1999) & Robot thông minh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
