import { useState, useMemo } from 'react';
import { Mic, Eye, EyeOff, ThumbsUp, ThumbsDown, Minus, Shuffle, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { oralExamQuestions } from '../data/oralExamData';
import type { ProgressState } from '../hooks/useProgress';

interface Props {
  progress: {
    updateOralExamProgress: (id: string, status: 'known' | 'partial' | 'unknown') => void;
    progress: ProgressState;
  };
}

const categories = ['Vse', ...Array.from(new Set(oralExamQuestions.map(q => q.category)))];

export default function OralExam({ progress }: Props) {
  const [category, setCategory] = useState('Vse');
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'sequential' | 'random'>('sequential');

  const filtered = useMemo(() => {
    let pool = category === 'Vse' ? [...oralExamQuestions] : oralExamQuestions.filter(q => q.category === category);
    if (mode === 'random') pool = pool.sort(() => Math.random() - 0.5);
    return pool;
  }, [category, mode]);

  const current = filtered[index];
  const status = current ? progress.progress.oralExamProgress[current.id]?.status : undefined;

  const handleRate = (rating: 'known' | 'partial' | 'unknown') => {
    if (current) progress.updateOralExamProgress(current.id, rating);
    setShowAnswer(false);
    setIndex(i => (i + 1) % filtered.length);
  };

  const getStatusColor = (s?: string) => {
    if (s === 'known') return 'var(--success)';
    if (s === 'partial') return 'var(--warning)';
    if (s === 'unknown') return 'var(--danger)';
    return 'var(--text-muted)';
  };

  if (!current) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Simulator ustnega spraševanja</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Učitelj te sprašuje — poskusi odgovoriti naglas, nato preveri model odgovor in oceni svoje znanje.
        </p>
      </div>

      {/* Controls */}
      <div className="card flex flex-wrap items-center gap-3">
        <Filter size={16} style={{ color: 'var(--text-muted)' }} />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setIndex(0); setShowAnswer(false); }}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${category === cat ? 'text-white' : ''}`}
            style={category === cat ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => { setMode(m => m === 'random' ? 'sequential' : 'random'); setIndex(0); setShowAnswer(false); }}
            className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            {mode === 'random' ? <Shuffle size={12} /> : <ArrowRight size={12} />}
            {mode === 'random' ? 'Naključno' : 'Po vrsti'}
          </button>
        </div>
      </div>

      {/* Question card */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Vprašanje {index + 1} od {filtered.length}
            </span>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
            Vir: {current.source}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            {current.category}
          </span>
          {status && (
            <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: getStatusColor(status) + '20', color: getStatusColor(status) }}>
              {status === 'known' ? 'Znal' : status === 'partial' ? 'Deloma' : 'Nisem znal'}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-lg leading-relaxed">{current.question}</h3>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="btn-primary text-sm inline-flex items-center gap-1.5"
          >
            <Eye size={14} /> Pokaži model odgovor
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-lg border-l-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>Model odgovor:</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{current.modelAnswer}</p>
            </div>

            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Ključne besede, ki jih moraš omeniti:</p>
              <div className="flex flex-wrap gap-1.5">
                {current.keywords.map(k => (
                  <span key={k} className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Kako dobro si znal?</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRate('unknown')}
                  className="flex-1 py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                  style={{ background: '#ef444415', color: 'var(--danger)', border: '1px solid var(--danger)' }}
                >
                  <ThumbsDown size={14} /> Nisem znal
                </button>
                <button
                  onClick={() => handleRate('partial')}
                  className="flex-1 py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                  style={{ background: '#f59e0b15', color: 'var(--warning)', border: '1px solid var(--warning)' }}
                >
                  <Minus size={14} /> Deloma
                </button>
                <button
                  onClick={() => handleRate('known')}
                  className="flex-1 py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                  style={{ background: '#22c55e15', color: 'var(--success)', border: '1px solid var(--success)' }}
                >
                  <ThumbsUp size={14} /> Znal
                </button>
              </div>
            </div>

            <button onClick={() => setShowAnswer(false)} className="text-xs inline-flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <EyeOff size={12} /> Skrij odgovor
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => { setIndex(i => (i - 1 + filtered.length) % filtered.length); setShowAnswer(false); }}
            className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded"
            style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
          >
            <ChevronLeft size={14} /> Prejšnje
          </button>
          <button
            onClick={() => { setIndex(i => (i + 1) % filtered.length); setShowAnswer(false); }}
            className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded"
            style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
          >
            Naslednje <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Progress summary */}
      <div className="card">
        <h3 className="font-semibold text-sm mb-3">Napredek po kategorijah</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.filter(c => c !== 'Vse').map(cat => {
            const catQs = oralExamQuestions.filter(q => q.category === cat);
            const known = catQs.filter(q => progress.progress.oralExamProgress[q.id]?.status === 'known').length;
            const partial = catQs.filter(q => progress.progress.oralExamProgress[q.id]?.status === 'partial').length;
            return (
              <div key={cat} className="p-2 rounded-lg text-center" style={{ background: 'var(--bg-secondary)' }}>
                <div className="text-xs font-medium truncate">{cat}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--success)' }}>{known}</span> +
                  <span style={{ color: 'var(--warning)' }}>{partial}</span> /
                  {catQs.length}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
