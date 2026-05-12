import { useLocalStorage } from './useLocalStorage';

export interface ProgressState {
  completedChapters: string[];
  quizResults: Record<string, { score: number; total: number; date: string }>;
  cardProgress: Record<string, { box: number; lastReviewed: string }>;
  oralExamProgress: Record<string, { status: 'known' | 'partial' | 'unknown'; attempts: number }>;
  lastVisited: string;
}

const initialProgress: ProgressState = {
  completedChapters: [],
  quizResults: {},
  cardProgress: {},
  oralExamProgress: {},
  lastVisited: '',
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressState>('geo-progress', initialProgress);

  const markChapterComplete = (chapterId: string) => {
    setProgress(prev => ({
      ...prev,
      completedChapters: prev.completedChapters.includes(chapterId)
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId],
    }));
  };

  const saveQuizResult = (category: string, score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [category]: { score, total, date: new Date().toISOString() },
      },
    }));
  };

  const updateCardProgress = (cardId: string, known: boolean) => {
    setProgress(prev => {
      const current = prev.cardProgress[cardId] || { box: 1, lastReviewed: '' };
      const newBox = known ? Math.min(current.box + 1, 5) : Math.max(current.box - 1, 1);
      return {
        ...prev,
        cardProgress: {
          ...prev.cardProgress,
          [cardId]: { box: newBox, lastReviewed: new Date().toISOString() },
        },
      };
    });
  };

  const updateOralExamProgress = (questionId: string, status: 'known' | 'partial' | 'unknown') => {
    setProgress(prev => {
      const current = prev.oralExamProgress[questionId] || { status, attempts: 0 };
      return {
        ...prev,
        oralExamProgress: {
          ...prev.oralExamProgress,
          [questionId]: { status, attempts: current.attempts + 1 },
        },
      };
    });
  };

  const setLastVisited = (section: string) => {
    setProgress(prev => ({ ...prev, lastVisited: section }));
  };

  const getOverallProgress = (totalChapters: number) => {
    const chapterPct = Math.round((progress.completedChapters.length / totalChapters) * 100);
    const quizEntries = Object.values(progress.quizResults);
    const quizAvg = quizEntries.length
      ? Math.round(quizEntries.reduce((a, b) => a + (b.score / b.total) * 100, 0) / quizEntries.length)
      : 0;
    const oralEntries = Object.values(progress.oralExamProgress);
    const oralPct = oralEntries.length
      ? Math.round((oralEntries.filter(e => e.status === 'known').length / oralEntries.length) * 100)
      : 0;
    return { chapterPct, quizAvg, oralPct, overall: Math.round((chapterPct + quizAvg + oralPct) / 3) };
  };

  return {
    progress,
    markChapterComplete,
    saveQuizResult,
    updateCardProgress,
    updateOralExamProgress,
    setLastVisited,
    getOverallProgress,
  };
}
