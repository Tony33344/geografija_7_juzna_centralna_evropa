import { BookOpen, Printer } from 'lucide-react';
import { glossary } from '../data/glossaryData';
import { oralExamQuestions } from '../data/oralExamData';

export default function CheatSheet() {
  const categories = Array.from(new Set(glossary.map(g => g.category)));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold mb-1">Listek za na pamet</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Hitri pregled vseh pojmov in ključnih vprašanj. Natisni ali shrani kot PDF.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="btn-secondary text-sm inline-flex items-center gap-1.5"
        >
          <Printer size={14} /> Natisni
        </button>
      </div>

      {/* Key oral exam questions */}
      <div className="card space-y-3 print-break-inside-avoid">
        <h3 className="font-display font-semibold text-lg flex items-center gap-2">
          <BookOpen size={18} style={{ color: 'var(--accent)' }} />
          Ključna ustna vprašanja
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {oralExamQuestions.slice(0, 20).map(q => (
            <div key={q.id} className="p-2.5 rounded-lg text-xs" style={{ background: 'var(--bg-secondary)' }}>
              <div className="font-medium mb-1">{q.question}</div>
              <div className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{q.modelAnswer.slice(0, 120)}...</div>
            </div>
          ))}
        </div>
      </div>

      {/* Glossary by category */}
      {categories.map(cat => {
        const terms = glossary.filter(g => g.category === cat);
        return (
          <div key={cat} className="card space-y-2 print-break-inside-avoid">
            <h3 className="font-display font-semibold text-base">{cat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {terms.map(term => (
                <div key={term.term} className="flex items-start gap-2 text-xs">
                  <span className="font-medium flex-shrink-0" style={{ color: 'var(--accent)' }}>{term.term}:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{term.definition}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
