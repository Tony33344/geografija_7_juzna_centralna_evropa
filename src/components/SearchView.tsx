import { useState, useMemo } from 'react';
import { Search, BookOpen, HelpCircle, MessageSquare, Layers } from 'lucide-react';
import { chapters } from '../data/textbookContent';
import { quizQuestions } from '../data/quizData';
import { oralExamQuestions } from '../data/oralExamData';
import { flashcards } from '../data/flashcardData';
import { glossary } from '../data/glossaryData';

interface SearchResult {
  type: 'textbook' | 'quiz' | 'oral' | 'flashcard' | 'glossary';
  title: string;
  snippet: string;
  category?: string;
}

export default function SearchView() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const out: SearchResult[] = [];

    chapters.forEach(ch => {
      ch.sections.forEach(sec => {
        const text = sec.content.join(' ').toLowerCase();
        if (text.includes(q) || sec.title.toLowerCase().includes(q)) {
          const snippet = sec.content.find(c => c.toLowerCase().includes(q)) || sec.content[0];
          out.push({ type: 'textbook', title: `${ch.title} — ${sec.title}`, snippet: snippet.slice(0, 150) + '...', category: ch.category });
        }
      });
    });

    quizQuestions.forEach(qz => {
      if (qz.question.toLowerCase().includes(q) || qz.explanation.toLowerCase().includes(q)) {
        out.push({ type: 'quiz', title: qz.question, snippet: qz.explanation, category: qz.category });
      }
    });

    oralExamQuestions.forEach(oq => {
      if (oq.question.toLowerCase().includes(q) || oq.modelAnswer.toLowerCase().includes(q)) {
        out.push({ type: 'oral', title: oq.question, snippet: oq.modelAnswer.slice(0, 150) + '...', category: oq.category });
      }
    });

    flashcards.forEach(fc => {
      if (fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q)) {
        out.push({ type: 'flashcard', title: fc.front, snippet: fc.back, category: fc.category });
      }
    });

    glossary.forEach(gl => {
      if (gl.term.toLowerCase().includes(q) || gl.definition.toLowerCase().includes(q)) {
        out.push({ type: 'glossary', title: gl.term, snippet: gl.definition, category: gl.category });
      }
    });

    return out.slice(0, 30);
  }, [query]);

  const iconMap = {
    textbook: BookOpen,
    quiz: HelpCircle,
    oral: MessageSquare,
    flashcard: Layers,
    glossary: Search,
  };

  const labelMap = {
    textbook: 'Učbenik',
    quiz: 'Kviz',
    oral: 'Ustno',
    flashcard: 'Kartica',
    glossary: 'Glosar',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Iskanje po snovi</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Poišči pojme, vprašanja, definicije in vsebino iz vseh delov učnega pripomočka.
        </p>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Išči npr. Panonska kotlina, Alpe, Donava, makija ..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>Vnesi vsaj 2 znaka ...</p>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{results.length} zadetkov</p>
          {results.map((res, idx) => {
            const Icon = iconMap[res.type];
            return (
              <div key={idx} className="card py-3 px-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                  <Icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>{labelMap[res.type]}</span>
                    {res.category && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>• {res.category}</span>}
                  </div>
                  <h3 className="font-medium text-sm truncate">{res.title}</h3>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{res.snippet}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="card text-center py-8">
          <p style={{ color: 'var(--text-muted)' }}>Ni zadetkov za "{query}"</p>
        </div>
      )}
    </div>
  );
}
