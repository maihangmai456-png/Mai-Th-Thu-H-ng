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
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 sm:p-8 shadow-lg shadow-indigo-700/20">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Hệ Thống Ôn Tập & Kiểm Tra Trắc Nghiệm Thông Minh
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight uppercase">
            GIA SƯ ÔN TẬP CÔNG NGHỆ 10 BÀI 3, 4
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-lg text-sm font-bold text-amber-200 mb-4 border border-white/25">
            Tác giả: GV: Mai Thị Thuý Hằng
          </div>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-4">
            Tùy biến bài học (Bài 3 & Bài 4 SGK Kết nối tri thức), số lượng câu hỏi và 3 cấp độ nhận thức 
            <span className="font-semibold text-white"> (Nhận biết, Thông hiểu, Vận dụng và Tổng hợp)</span>. 
            Hỗ trợ làm bài trắc nghiệm tương tác hoặc xuất đề thi ra giấy kèm đáp án chi tiết.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-white/90">
            <span className="bg-white/10 px-2.5 py-1 rounded-md">✓ Bài 3: Công nghệ phổ biến (10 mục)</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md">✓ Bài 4: Một số công nghệ mới (7 mục)</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md">✓ Đáp án & Trích dẫn trang SGK</span>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-6 -bottom-10 opacity-15 pointer-events-none">
          <BrainCircuit className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
        
        {/* STEP 1: CHỌN BÀI HỌC */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Học sinh chọn Bài học</h2>
                <p className="text-xs text-slate-500">Chọn một bài cụ thể hoặc tổng hợp cả hai bài học</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
              SGK Kết nối tri thức
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LESSONS.map((lesson) => {
              const isSelected = selectedLesson === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id)}
                  className={`group relative rounded-xl p-5 border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-500/10'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {lesson.code}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {lesson.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>{lesson.pages}</span>
                    <span className="font-medium text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
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
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Chọn Cấp độ nhận thức</h2>
                <p className="text-xs text-slate-500">3 cấp độ tư duy sư phạm hoặc Đề thi tổng hợp cả 3 cấp độ</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded">
              <Info className="w-3.5 h-3.5" />
              <span>Phân loại theo thang Bloom</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Cấp độ 1: Nhận biết */}
            <div
              onClick={() => setSelectedLevel('nhan_biet')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedLevel === 'nhan_biet'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                  : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Cơ bản
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Cấp độ 1: Nhận biết</h4>
              <p className="text-xs text-slate-600 mt-1">
                Ghi nhớ định nghĩa, thuật ngữ, từ viết tắt, mốc thời gian, tên gọi công nghệ.
              </p>
            </div>

            {/* Cấp độ 2: Thông hiểu */}
            <div
              onClick={() => setSelectedLevel('thong_hieu')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedLevel === 'thong_hieu'
                  ? 'border-blue-500 bg-blue-50/70 shadow-sm'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Trung bình
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Cấp độ 2: Thông hiểu</h4>
              <p className="text-xs text-slate-600 mt-1">
                Hiểu nguyên lý, so sánh phân biệt, giải thích bản chất quy trình công nghệ.
              </p>
            </div>

            {/* Cấp độ 3: Vận dụng */}
            <div
              onClick={() => setSelectedLevel('van_dung')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedLevel === 'van_dung'
                  ? 'border-purple-500 bg-purple-50/70 shadow-sm'
                  : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  Nâng cao
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Cấp độ 3: Vận dụng</h4>
              <p className="text-xs text-slate-600 mt-1">
                Tình huống thực tế, giải quyết vấn đề, ứng dụng trong sản xuất & đời sống.
              </p>
            </div>

            {/* Cấp độ Tổng hợp */}
            <div
              onClick={() => setSelectedLevel('tong_hop')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedLevel === 'tong_hop'
                  ? 'border-amber-500 bg-amber-50/70 shadow-md shadow-amber-500/10'
                  : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  ★
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Đề chuẩn
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Tổng hợp 3 Cấp độ</h4>
              <p className="text-xs text-slate-600 mt-1">
                Trộn tỉ lệ ma trận: 40% Nhận biết, 40% Thông hiểu, 20% Vận dụng.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 3: CHỌN SỐ LƯỢNG CÂU HỎI */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Học sinh chọn Số câu hỏi</h2>
                <p className="text-xs text-slate-500">Chọn số câu nhanh hoặc nhập số lượng mong muốn</p>
              </div>
            </div>
            <span className="text-xs text-slate-500">
              Đang chọn: <strong className="text-cyan-700 font-bold text-sm">{numQuestions} câu</strong>
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
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-sm ring-2 ring-cyan-600/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset} câu
                </button>
              );
            })}

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-medium text-slate-500">Hoặc tùy chỉnh:</span>
              <input
                type="number"
                min="1"
                max="30"
                placeholder="vd: 8"
                value={customNumInput}
                onChange={(e) => handleCustomNumberChange(e.target.value)}
                className="w-20 px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-center font-bold"
              />
              <span className="text-xs text-slate-500">câu</span>
            </div>
          </div>
        </div>

        {/* STEP 4: CHẾ ĐỘ LÀM BÀI & NGUỒN CÂU HỎI */}
        <div className="pt-2 border-t border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chế độ thi */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Chế độ làm bài
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuizMode('practice')}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    quizMode === 'practice'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold">Luyện tập</span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    Xem đáp án & giải thích SGK ngay sau mỗi câu trả lời.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setQuizMode('exam')}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    quizMode === 'exam'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-bold">Thi thử</span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    Đếm ngược thời gian, nộp bài tính điểm 10 & xếp loại.
                  </p>
                </button>
              </div>
            </div>

            {/* Nguồn đề: Chuẩn SGK vs AI Gemini */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Bộ tạo câu hỏi
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setUseAI(false)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    !useAI
                      ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold">Kho Chuẩn SGK</span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    Biên soạn sẵn, mở làm ngay tức thì không cần chờ đợi.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setUseAI(true)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    useAI
                      ? 'border-purple-600 bg-purple-50/60 text-purple-900 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-bold">Sinh Đề Bằng AI</span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    Gemini 3.8 sinh đề mới lạ, sáng tạo tình huống độc quyền.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* AI Custom prompt optional */}
          {useAI && (
            <div className="mt-4 p-4 rounded-xl bg-purple-50/70 border border-purple-200">
              <label className="block text-xs font-bold text-purple-900 mb-1">
                Yêu cầu bổ sung cho AI (tùy chọn):
              </label>
              <input
                type="text"
                placeholder="Ví dụ: 'Tập trung nhiều câu hỏi về công nghệ in 3D và IoT' hoặc 'Thêm tình huống thực tế nông thôn'..."
                value={customTopicNote}
                onChange={(e) => setCustomTopicNote(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-purple-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleStart}
            disabled={isLoadingAI}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-md shadow-blue-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoadingAI ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>AI Gemini đang biên soạn đề...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Bắt Đầu Làm Bài ({numQuestions} câu)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isLoadingAI}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Xuất Đề & In Ra Giấy (PDF)</span>
          </button>
        </div>

      </div>

      {/* Quick Summary Cards of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              Bài 3: Công nghệ phổ biến
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trang 14-22: Luyện kim (lò cao gang thép, kim loại màu), Đúc kim loại (ly tâm, áp lực), Cắt gọt (tiện, phay, bào, mài), Áp lực (cán, kéo, rèn, dập), Hàn (hồ quang, MAG), Sản xuất điện, Điện - Quang (LED, sợi đốt), Điện - Cơ (quay, tịnh tiến - relay 1835).
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              Bài 4: Một số công nghệ mới
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trang 23-28: Công nghệ nano (1-100nm, tiêu diệt tế bào ung thư, vải nano bạc kháng khuẩn), CAD/CAM/CNC (chuỗi liên hoàn thiết kế - lập trình - gia công), In 3D (đắp lớp tuần tự), Năng lượng tái tạo, AI mô phỏng trí tuệ, IoT (Kevin Ashton 1999) & Robot thông minh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
