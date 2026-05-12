import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Bookmark, Highlighter, Lightbulb, Info, ChevronRight } from 'lucide-react';
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
                    <FormattedContent
                      paragraphs={section.content}
                      highlightText={highlightText}
                      handleTermHover={handleTermHover}
                      onLeave={() => setHoveredTerm(null)}
                    />
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
                    <ImageForSection chapterId={chapter.id} sectionId={section.id} />
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

/* === FORMATTED CONTENT === */
interface FormattedProps {
  paragraphs: string[];
  highlightText: (text: string) => string;
  handleTermHover: (term: string, e: React.MouseEvent) => void;
  onLeave: () => void;
}

function FormattedContent({ paragraphs, highlightText, handleTermHover, onLeave }: FormattedProps) {
  // Detect list patterns
  const isBullet = (text: string) => /^\s*[•\-\–]\s+/.test(text);
  const isNumbered = (text: string) => /^\s*\d+[\)\.\:]\s+/.test(text);
  const isLettered = (text: string) => /^\s*[a-zčšž]\)[\s\:]/.test(text.toLowerCase());
  const isDefinition = (text: string) => /^[^,.]{2,40}\s+—\s+/.test(text);
  const isShortFact = (text: string) => {
    const clean = text.trim();
    return clean.length < 80 && (clean.includes(':') || clean.includes('je') || clean.includes('so'));
  };

  const stripBullet = (text: string) => text.replace(/^\s*[•\-\–]\s+/, '');
  const stripNumber = (text: string) => text.replace(/^\s*\d+[\)\.\:]\s+/, '');
  const stripLetter = (text: string) => text.replace(/^\s*[a-zčšž]\)[\s\:]/i, '');

  const renderParagraph = (text: string, idx: number) => {
    const html = highlightText(text);

    if (isDefinition(text)) {
      const [term, ...rest] = text.split(' — ');
      const definition = rest.join(' — ');
      return (
        <div key={idx} className="p-3 rounded-lg my-2" style={{ background: 'var(--accent)08', borderLeft: '3px solid var(--accent)' }}>
          <div className="flex items-start gap-2">
            <Lightbulb size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <span className="font-semibold text-sm" style={{ color: 'var(--accent)' }} dangerouslySetInnerHTML={{ __html: highlightText(term) }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}> — {definition}</span>
            </div>
          </div>
        </div>
      );
    }

    if (isBullet(text)) {
      return (
        <div key={idx} className="flex items-start gap-2 my-1.5">
          <ChevronRight size={14} style={{ color: 'var(--accent)', marginTop: '4px', flexShrink: 0 }} />
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: highlightText(stripBullet(text)) }}
            onMouseMove={e => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'MARK') handleTermHover(target.textContent || '', e);
            }}
            onMouseLeave={onLeave}
          />
        </div>
      );
    }

    if (isNumbered(text)) {
      const match = text.match(/^\s*(\d+)[\)\.\:]\s+/);
      const num = match ? match[1] : '';
      return (
        <div key={idx} className="flex items-start gap-2.5 my-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>
            {num}
          </span>
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: highlightText(stripNumber(text)) }}
            onMouseMove={e => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'MARK') handleTermHover(target.textContent || '', e);
            }}
            onMouseLeave={onLeave}
          />
        </div>
      );
    }

    if (isLettered(text)) {
      const match = text.match(/^\s*([a-zčšž])[\)\:\s]/i);
      const letter = match ? match[1].toLowerCase() : '';
      return (
        <div key={idx} className="flex items-start gap-2.5 my-1.5 ml-2">
          <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold uppercase" style={{ background: 'var(--bg-secondary)', color: 'var(--accent)' }}>
            {letter}
          </span>
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: highlightText(stripLetter(text)) }}
            onMouseMove={e => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'MARK') handleTermHover(target.textContent || '', e);
            }}
            onMouseLeave={onLeave}
          />
        </div>
      );
    }

    // Group short facts into a grid card
    if (isShortFact(text)) {
      return (
        <div key={idx} className="p-2.5 rounded-lg my-1.5 flex items-start gap-2" style={{ background: 'var(--bg-secondary)' }}>
          <Info size={14} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: html }}
            onMouseMove={e => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'MARK') handleTermHover(target.textContent || '', e);
            }}
            onMouseLeave={onLeave}
          />
        </div>
      );
    }

    // Default paragraph
    return (
      <p
        key={idx}
        className="text-sm leading-relaxed my-2"
        style={{ color: 'var(--text-secondary)' }}
        dangerouslySetInnerHTML={{ __html: html }}
        onMouseMove={e => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'MARK') handleTermHover(target.textContent || '', e);
        }}
        onMouseLeave={onLeave}
      />
    );
  };

  // Group consecutive bullets
  const elements: React.ReactNode[] = [];
  let currentBulletGroup: React.ReactNode[] = [];

  paragraphs.forEach((text, idx) => {
    if (isBullet(text) || isLettered(text)) {
      currentBulletGroup.push(renderParagraph(text, idx));
    } else {
      if (currentBulletGroup.length > 0) {
        elements.push(
          <div key={`group-${idx}`} className="my-2 p-2 rounded-lg" style={{ background: 'var(--bg-secondary)30' }}>
            {currentBulletGroup}
          </div>
        );
        currentBulletGroup = [];
      }
      elements.push(renderParagraph(text, idx));
    }
  });

  if (currentBulletGroup.length > 0) {
    elements.push(
      <div key="group-last" className="my-2 p-2 rounded-lg" style={{ background: 'var(--bg-secondary)30' }}>
        {currentBulletGroup}
      </div>
    );
  }

  return <div>{elements}</div>;
}

/* === REAL IMAGES === */
function ImageForSection({ chapterId, sectionId }: { chapterId: string; sectionId: string }) {
  const key = `${chapterId}.${sectionId}`;

  const images: Record<string, { src: string; alt: string }> = {
    'evropa-splosno.lega': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Europe_orthographic_Caucasus_Urals_boundary_%28with_borders%29.svg',
      alt: 'Zemljevid lege Evrope',
    },
    'evropa-splosno.podnebje': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Koppen-Geiger_Map_Europe_present.svg',
      alt: 'Köppen-Geiger podnebni zemljevid Evrope',
    },
    'j-jv-evropa.povrsje-j-jv': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Europe_topography_map.png',
      alt: 'Reliefni zemljevid Evrope',
    },
    'j-jv-evropa.potresi-vulkani': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Volcano_scheme.svg',
      alt: 'Presek vulkana',
    },
    'sredozemsko-morje.značilnosti': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Mediterranean_Sea_political_map.svg',
      alt: 'Zemljevid Sredozemskega morja',
    },
    'srednja-evropa.alpe': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Alpenrelief_01.jpg',
      alt: 'Relief Alp',
    },
    'srednja-evropa.panonska': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Pannonian_Basin.jpg',
      alt: 'Satelitska slika Panonske kotline',
    },
    'srednja-evropa.donava': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Danube_Basin_map.svg',
      alt: 'Zemljevid porečja Donave',
    },
  };

  const img = images[key];
  if (!img) return null;

  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: {img.alt}</p>
      <img
        src={img.src}
        alt={img.alt}
        className="w-full rounded-lg"
        style={{ maxHeight: '320px', objectFit: 'contain', background: '#fff' }}
        loading="lazy"
      />
      <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
        Vir: Wikimedia Commons (CC BY-SA)
      </p>
    </div>
  );
}
