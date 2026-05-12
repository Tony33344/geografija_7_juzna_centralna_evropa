import { useState, useEffect, useCallback } from 'react';
import { Check, X, ArrowRight, RotateCcw, Trophy, Filter, Clock } from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '../data/quizData';

interface Props {
  progress: {
    saveQuizResult: (cat: string, score: number, total: number) => void;
  };
}

const categories = ['Vse', ...Array.from(new Set(quizQuestions.map(q => q.category)))];

export default function Quiz({ progress }: Props) {
  const [category, setCategory] = useState('Vse');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const startQuiz = useCallback((cat: string, m: 'all' | 'wrong' = 'all') => {
    let pool = cat === 'Vse' ? [...quizQuestions] : quizQuestions.filter(q => q.category === cat);
    if (m === 'wrong') pool = pool.filter(q => wrongIds.includes(q.id));
    // Shuffle
    pool = pool.sort(() => Math.random() - 0.5);
    setQuestions(pool);
    setCurrentIndex(0);
    setSelected([]);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setTimer(0);
    setTimerActive(true);
  }, [wrongIds]);

  useEffect(() => {
    if (questions.length === 0 && !finished) startQuiz(category);
  }, [category, startQuiz, questions.length, finished]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive) interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const current = questions[currentIndex];
  const total = questions.length;

  const isCorrect = () => {
    if (!current) return false;
    const sortedSelected = [...selected].sort((a, b) => a - b);
    const sortedCorrect = [...current.correct].sort((a, b) => a - b);
    return JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);
  };

  const handleCheck = () => {
    if (selected.length === 0) return;
    const correct = isCorrect();
    if (correct) setScore(s => s + 1);
    else setWrongIds(prev => prev.includes(current.id) ? prev : [...prev, current.id]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      setFinished(true);
      setTimerActive(false);
      progress.saveQuizResult(category === 'Vse' ? 'Vsi kvizi' : category, score + (isCorrect() ? 0 : 0), total);
    } else {
      setCurrentIndex(i => i + 1);
      setSelected([]);
      setShowResult(false);
    }
  };

  const toggleSelect = (idx: number) => {
    if (showResult) return;
    if (current?.type === 'single' || current?.type === 'truefalse') {
      setSelected([idx]);
    } else {
      setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="max-w-xl mx-auto card text-center space-y-4">
        <Trophy size={48} style={{ color: pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)' }} className="mx-auto" />
        <h2 className="font-display text-2xl font-bold">Kviz končan!</h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Rezultat: <strong>{score}/{total}</strong> ({pct}%)
        </p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Čas: {formatTime(timer)}</p>
        {wrongIds.length > 0 && (
          <button onClick={() => startQuiz(category, 'wrong')} className="btn-secondary text-sm inline-flex items-center gap-1.5">
            <RotateCcw size={14} /> Ponovi napačne
          </button>
        )}
        <button onClick={() => startQuiz(category, 'all')} className="btn-primary text-sm inline-flex items-center gap-1.5 ml-2">
          <RotateCcw size={14} /> Nov kviz
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Filters */}
      <div className="card flex flex-wrap items-center gap-3">
        <Filter size={16} style={{ color: 'var(--text-muted)' }} />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); startQuiz(cat, 'all'); }}
            className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${category === cat ? 'text-white' : ''}`}
            style={category === cat ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Clock size={12} /> {formatTime(timer)}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span>Vprašanje {currentIndex + 1} od {total}</span>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${((currentIndex) / total) * 100}%`, background: 'var(--accent)' }} />
        </div>
      </div>

      {/* Question */}
      <div className="card space-y-4">
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            {current.type === 'single' ? 'Izberi enega' : current.type === 'multi' ? 'Izberi vse, ki veljajo' : current.type === 'truefalse' ? 'Res / Ni res' : 'Poveži'}
          </span>
        </div>
        <h3 className="font-semibold text-base leading-relaxed">{current.question}</h3>

        <div className="space-y-2">
          {current.options.map((opt, idx) => {
            const isSelected = selected.includes(idx);
            const isCorrect = current.correct.includes(idx);
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => toggleSelect(idx)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center justify-between ${showCorrect ? 'border-green-500' : showWrong ? 'border-red-500' : isSelected ? 'border-blue-500' : ''}`}
                style={{
                  background: showCorrect ? '#22c55e15' : showWrong ? '#ef444415' : isSelected ? 'var(--accent-light)' : 'var(--bg-primary)',
                  borderColor: showCorrect ? '#22c55e' : showWrong ? '#ef4444' : isSelected ? 'var(--accent)' : 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{opt}</span>
                {showCorrect && <Check size={16} className="text-green-500" />}
                {showWrong && <X size={16} className="text-red-500" />}
                {isSelected && !showResult && <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--accent)' }} />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="p-3 rounded-lg text-sm" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            <strong>Razlaga:</strong> {current.explanation}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {!showResult ? (
            <button
              onClick={handleCheck}
              disabled={selected.length === 0}
              className="btn-primary text-sm inline-flex items-center gap-1.5"
            >
              Preveri
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary text-sm inline-flex items-center gap-1.5">
              {currentIndex + 1 >= total ? 'Končaj' : 'Naprej'} <ArrowRight size={14} />
            </button>
          )}
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Točke: {score}</span>
        </div>
      </div>
    </div>
  );
}
