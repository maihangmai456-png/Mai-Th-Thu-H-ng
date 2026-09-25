export type LessonId = 'bai-3' | 'bai-4' | 'all';

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'tong_hop';

export interface LessonInfo {
  id: LessonId;
  code: string;
  title: string;
  subtitle: string;
  pages: string;
  topicsCount: number;
  description: string;
  topics: string[];
}

export interface Question {
  id: string;
  lessonId: 'bai-3' | 'bai-4';
  lessonTitle: string;
  level: 'nhan_biet' | 'thong_hieu' | 'van_dung';
  levelLabel: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  textbookReference: string;
}

export interface QuizFilterConfig {
  lessonId: LessonId;
  level: DifficultyLevel;
  numQuestions: number;
  mode: 'practice' | 'exam'; // practice: instant check & explain; exam: timed, review at end
  useAI: boolean;
  customTopicNote?: string;
}

export interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number; // out of 10
  percentage: number;
  timeSpentSeconds: number;
  rating: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Cần cố gắng';
  levelBreakdown: {
    nhan_biet: { total: number; correct: number };
    thong_hieu: { total: number; correct: number };
    van_dung: { total: number; correct: number };
  };
  lessonBreakdown: {
    'bai-3': { total: number; correct: number };
    'bai-4': { total: number; correct: number };
  };
}

export interface Flashcard {
  id: string;
  lessonId: 'bai-3' | 'bai-4';
  topic: string;
  front: string;
  back: string;
  detail: string;
  keyTerms: string[];
}
