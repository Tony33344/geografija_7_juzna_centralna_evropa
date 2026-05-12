import { useState, useMemo } from 'react';
import { RotateCw, ThumbsUp, ThumbsDown, Brain, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { flashcards } from '../data/flashcardData';
import type { ProgressState } from '../hooks/useProgress';

interface Props {
  progress: {
    updateCardProgress: (id: string, known: boolean) => void;
    progress: ProgressState;
  };
}

export default function Flashcards({ progress }: Props) {
  const [category, setCategory] = useState('Vse');
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const cats = ['Vse', ...Array.from(new Set(flashcards.map(f => f.category)))];

  const filtered = useMemo(() => {
    const pool = category === 'Vse' ? flashcards : flashcards.filter(f => f.category === category);
    // Sort by Leitner box (lower box first = needs review)
    return [...pool].sort((a, b) => {
      const boxA = progress.progress.cardProgress[a.id]?.box || 1;
      const boxB = progress.progress.cardProgress[b.id]?.box || 1;
      return boxA - boxB;
    });
  }, [category, progress.progress.cardProgress]);

  const current = filtered[index];
  const box = current ? (progress.progress.cardProgress[current.id]?.box || 1) : 1;

  const handleKnown = (known: boolean) => {
    if (current) progress.updateCardProgress(current.id, known);
    setFlipped(false);
    setIndex(i => (i + 1) % filtered.length);
  };

  const boxColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#0ea5e9'];

  if (!current) return null;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Kartice za pomnjenje</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Obrni kartico in oceni, ali si poznal odgovor. Kartice se ponavljajo po sistemu Leitner.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {cats.map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setIndex(0); setFlipped(false); }}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${category === cat ? 'text-white' : ''}`}
            style={category === cat ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="relative">
        <button
          onClick={() => setFlipped(!flipped)}
          className="w-full card min-h-[200px] flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
        >
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <Layers size={12} style={{ color: boxColors[box - 1] }} />
            <span className="text-xs font-medium" style={{ color: boxColors[box - 1] }}>Škatla {box}/5</span>
          </div>

          {!flipped ? (
            <>
              <Brain size={32} style={{ color: 'var(--accent)' }} className="mb-3" />
              <p className="text-base font-medium leading-relaxed px-4">{current.front}</p>
              <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>Klikni za odgovor</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>{current.front}</p>
              <p className="text-base leading-relaxed px-4">{current.back}</p>
              <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>Kategorija: {current.category}</p>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => { setIndex(i => (i - 1 + filtered.length) % filtered.length); setFlipped(false); }}
          className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {index + 1} / {filtered.length}
        </span>
        <button
          onClick={() => { setIndex(i => (i + 1) % filtered.length); setFlipped(false); }}
          className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Rating */}
      {flipped && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleKnown(false)}
            className="btn-secondary text-sm inline-flex items-center gap-1.5 px-4 py-2"
            style={{ color: 'var(--danger)' }}
          >
            <ThumbsDown size={16} /> Nisem znal
          </button>
          <button
            onClick={() => handleKnown(true)}
            className="btn-primary text-sm inline-flex items-center gap-1.5 px-4 py-2"
            style={{ background: 'var(--success)' }}
          >
            <ThumbsUp size={16} /> Znal
          </button>
        </div>
      )}

      {!flipped && (
        <div className="text-center">
          <button onClick={() => setFlipped(true)} className="btn-primary text-sm inline-flex items-center gap-1.5">
            <RotateCw size={14} /> Pokaži odgovor
          </button>
        </div>
      )}
    </div>
  );
}
