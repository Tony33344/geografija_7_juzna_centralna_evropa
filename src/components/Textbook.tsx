import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Bookmark, Highlighter } from 'lucide-react';
import { chapters } from '../data/textbookContent';
import { glossary } from '../data/glossaryData';
import type { ProgressState } from '../hooks/useProgress';

interface Props {
  progress: {
    progress: ProgressState;
    markChapterComplete: (id: string) => void;
  };
}

export default function Textbook({ progress }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleTermHover = (term: string, e: React.MouseEvent) => {
    const match = glossary.find(g =>
      g.term.toLowerCase() === term.toLowerCase() ||
      term.toLowerCase().includes(g.term.toLowerCase())
    );
    if (match) {
      setHoveredTerm(match.definition);
      setTooltipPos({ x: e.clientX, y: e.clientY - 40 });
    }
  };

  const highlightText = (text: string) => {
    let result = text;
    glossary.forEach(g => {
      const regex = new RegExp(`\\b${g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      result = result.replace(regex, `<mark class="geo-term cursor-help rounded px-0.5" style="background:var(--accent-light);color:var(--accent)">$&</mark>`);
    });
    return result;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Učbenik</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Preberi vso snov in označi poglavja kot predelana. Pojmi z barvnim ozadjem so pojasnjeni v glosarju — zadrži miško nad njimi.
        </p>
      </div>

      {chapters.map(chapter => (
        <div key={chapter.id} className="card p-0 overflow-hidden">
          <button
            onClick={() => toggleSection(chapter.id)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div>
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                {chapter.category}
              </span>
              <h3 className="font-display font-semibold text-base mt-0.5">{chapter.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              {progress.progress.completedChapters.includes(chapter.id) && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'var(--success)', color: '#fff' }}>
                  <Check size={12} /> Predelano
                </span>
              )}
              {openSection === chapter.id ? <ChevronUp size={20} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
            </div>
          </button>

          {openSection === chapter.id && (
            <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="mt-4 space-y-5">
                {chapter.sections.map(section => (
                  <div key={section.id}>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                      <Highlighter size={14} style={{ color: 'var(--accent)' }} />
                      {section.title}
                    </h4>
                    <div className="space-y-1.5">
                      {section.content.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-sm leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                          dangerouslySetInnerHTML={{ __html: highlightText(paragraph) }}
                          onMouseMove={e => {
                            const target = e.target as HTMLElement;
                            if (target.tagName === 'MARK') {
                              handleTermHover(target.textContent || '', e);
                            }
                          }}
                          onMouseLeave={() => setHoveredTerm(null)}
                        />
                      ))}
                    </div>
                    {section.highlights && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {section.highlights.map(h => (
                          <span key={h} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                            <Bookmark size={10} className="inline mr-1" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => progress.markChapterComplete(chapter.id)}
                className="mt-4 btn-primary text-sm inline-flex items-center gap-1.5"
                disabled={progress.progress.completedChapters.includes(chapter.id)}
              >
                <Check size={14} />
                {progress.progress.completedChapters.includes(chapter.id) ? 'Predelano' : 'Označi kot predelano'}
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Tooltip */}
      {hoveredTerm && (
        <div
          className="fixed z-50 max-w-xs p-3 rounded-lg text-xs shadow-lg pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          {hoveredTerm}
        </div>
      )}
    </div>
  );
}
