import { Question, QuizFilterConfig, LessonId, DifficultyLevel } from '../types';
import { BUILTIN_QUESTIONS } from '../data/questionBank';

// Shuffle array using Fisher-Yates
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate question set from built-in question bank
export function getBuiltinQuiz(config: QuizFilterConfig): Question[] {
  const { lessonId, level, numQuestions } = config;

  // Filter by lesson
  let pool = BUILTIN_QUESTIONS.filter((q) => {
    if (lessonId === 'all') return true;
    return q.lessonId === lessonId;
  });

  if (level !== 'tong_hop') {
    // Exact level match
    const levelFiltered = pool.filter((q) => q.level === level);
    // If not enough questions in exact level, keep all we have
    const selected = shuffleArray(levelFiltered).slice(0, numQuestions);
    return selected;
  }

  // TỔNG HỢP 3 CẤP ĐỘ: standard pedagogical ratio
  // Target: 40% Nhận biết, 40% Thông hiểu, 20% Vận dụng
  const nbCount = Math.max(1, Math.round(numQuestions * 0.4));
  const thCount = Math.max(1, Math.round(numQuestions * 0.4));
  const vdCount = Math.max(1, numQuestions - nbCount - thCount);

  const nbPool = shuffleArray(pool.filter((q) => q.level === 'nhan_biet'));
  const thPool = shuffleArray(pool.filter((q) => q.level === 'thong_hieu'));
  const vdPool = shuffleArray(pool.filter((q) => q.level === 'van_dung'));

  const chosenNb = nbPool.slice(0, nbCount);
  const chosenTh = thPool.slice(0, thCount);
  const chosenVd = vdPool.slice(0, vdCount);

  let combined = [...chosenNb, ...chosenTh, ...chosenVd];

  // If still fewer than requested (due to pool size), fill with remaining questions
  if (combined.length < numQuestions) {
    const usedIds = new Set(combined.map((q) => q.id));
    const remaining = shuffleArray(pool.filter((q) => !usedIds.has(q.id)));
    combined = [...combined, ...remaining.slice(0, numQuestions - combined.length)];
  }

  return shuffleArray(combined.slice(0, numQuestions));
}

// Call server-side Gemini API to generate custom quiz questions
export async function fetchAIQuiz(config: QuizFilterConfig): Promise<Question[]> {
  const response = await fetch('/api/generate-quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lessonId: config.lessonId,
      level: config.level,
      numQuestions: config.numQuestions,
      customNote: config.customTopicNote,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Lỗi máy chủ (${response.status})`);
  }

  const data = await response.json();
  if (!data.success || !Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error('Không nhận được câu hỏi hợp lệ từ máy chủ');
  }

  return data.questions.map((q: any, idx: number) => ({
    id: q.id || `ai-q-${idx + 1}`,
    lessonId: q.lessonId || (config.lessonId === 'bai-3' ? 'bai-3' : 'bai-4'),
    lessonTitle: q.lessonTitle || (q.lessonId === 'bai-3' ? 'Bài 3: Công nghệ phổ biến' : 'Bài 4: Một số công nghệ mới'),
    level: q.level || 'nhan_biet',
    levelLabel: q.levelLabel || (q.level === 'nhan_biet' ? 'Nhận biết' : q.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'),
    topic: q.topic || 'Công nghệ 10',
    question: q.question,
    options: q.options as [string, string, string, string],
    correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
    explanation: q.explanation || 'Xem lại bài học trong SGK Công nghệ 10.',
    textbookReference: q.textbookReference || 'SGK Công nghệ 10 - Kết nối tri thức',
  }));
}
