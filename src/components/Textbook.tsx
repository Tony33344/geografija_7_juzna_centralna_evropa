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
                    <DiagramForSection chapterId={chapter.id} sectionId={section.id} />
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

/* === SVG DIAGRAMS === */
function DiagramForSection({ chapterId, sectionId }: { chapterId: string; sectionId: string }) {
  const key = `${chapterId}.${sectionId}`;

  switch (key) {
    case 'evropa-splosno.lega':
      return <EuropeLocationDiagram />;
    case 'evropa-splosno.podnebje':
      return <ClimateZonesDiagram />;
    case 'j-jv-evropa.povrsje-j-jv':
      return <SouthernEuropeReliefDiagram />;
    case 'j-jv-evropa.potresi-vulkani':
      return <VolcanoDiagram />;
    case 'sredozemsko-morje.značilnosti':
      return <MediterraneanDiagram />;
    case 'srednja-evropa.alpe':
      return <AlpineZonesDiagram />;
    case 'srednja-evropa.panonska':
      return <PannonianBasinDiagram />;
    case 'srednja-evropa.donava':
      return <RiversDiagram />;
    default:
      return null;
  }
}

function EuropeLocationDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Lega Evrope</p>
      <svg viewBox="0 0 400 250" className="w-full max-w-md mx-auto" style={{ minHeight: '180px' }}>
        {/* Background */}
        <rect x="0" y="0" width="400" height="250" fill="#1e3a5f" rx="8" />
        {/* Europe */}
        <path d="M180,40 Q220,30 260,50 L280,80 L270,120 L250,150 L220,170 L180,160 L150,130 L140,90 L160,60 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="2" />
        {/* Africa */}
        <path d="M160,170 L220,170 L240,200 L200,230 L160,220 L140,190 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
        {/* Asia */}
        <path d="M280,50 L360,40 L380,80 L370,130 L320,140 L280,120 Z" fill="#f87171" stroke="#ef4444" strokeWidth="2" />
        {/* Atlantic */}
        <text x="70" y="100" fill="#93c5fd" fontSize="14" textAnchor="middle">Atlantski ocean</text>
        {/* Mediterranean */}
        <text x="210" y="165" fill="#93c5fd" fontSize="11" textAnchor="middle">Sredozemsko morje</text>
        {/* Labels */}
        <text x="200" y="100" fill="#065f46" fontSize="12" fontWeight="bold" textAnchor="middle">Evropa</text>
        <text x="330" y="90" fill="#7f1d1d" fontSize="12" fontWeight="bold" textAnchor="middle">Azija</text>
        <text x="190" y="205" fill="#78350f" fontSize="12" fontWeight="bold" textAnchor="middle">Afrika</text>
        {/* North arrow */}
        <polygon points="200,15 195,28 205,28" fill="#fff" />
        <text x="200" y="12" fill="#fff" fontSize="10" textAnchor="middle">S</text>
      </svg>
    </div>
  );
}

function ClimateZonesDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Podnebni pasovi Evrope</p>
      <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" style={{ minHeight: '140px' }}>
        <rect x="0" y="0" width="400" height="200" fill="#f8fafc" rx="8" />
        {/* Tundra */}
        <rect x="20" y="20" width="360" height="30" fill="#cbd5e1" rx="4" />
        <text x="200" y="40" fill="#334155" fontSize="12" textAnchor="middle" fontWeight="500">Tundrsko podnebje (sever)</text>
        {/* Oceanic */}
        <rect x="20" y="60" width="360" height="30" fill="#86efac" rx="4" />
        <text x="200" y="80" fill="#14532d" fontSize="12" textAnchor="middle" fontWeight="500">Oceansko podnebje (zahod)</text>
        {/* Continental */}
        <rect x="20" y="100" width="360" height="30" fill="#fde047" rx="4" />
        <text x="200" y="120" fill="#713f12" fontSize="12" textAnchor="middle" fontWeight="500">Celinsko podnebje (vzhod)</text>
        {/* Mediterranean */}
        <rect x="20" y="140" width="360" height="30" fill="#fdba74" rx="4" />
        <text x="200" y="160" fill="#7c2d12" fontSize="12" textAnchor="middle" fontWeight="500">Sredozemsko podnebje (jug)</text>
      </svg>
    </div>
  );
}

function SouthernEuropeReliefDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Površje Južne in Jugovzhodne Evrope</p>
      <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" style={{ minHeight: '140px' }}>
        <rect x="0" y="0" width="400" height="200" fill="#f0f9ff" rx="8" />
        {/* Mountains */}
        <polygon points="40,140 80,60 120,140" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        <text x="80" y="155" fill="#475569" fontSize="10" textAnchor="middle" fontWeight="500">Pireneji</text>
        <polygon points="140,140 180,50 220,140" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        <text x="180" y="155" fill="#475569" fontSize="10" textAnchor="middle" fontWeight="500">Apenini</text>
        <polygon points="240,140 280,55 320,140" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        <text x="280" y="155" fill="#475569" fontSize="10" textAnchor="middle" fontWeight="500">Balkan</text>
        <polygon points="320,140 360,70 400,140" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        <text x="360" y="155" fill="#475569" fontSize="10" textAnchor="middle" fontWeight="500">Karpati</text>
        {/* Sea */}
        <rect x="0" y="160" width="400" height="40" fill="#93c5fd" rx="0" opacity="0.5" />
        <text x="200" y="185" fill="#1e40af" fontSize="11" textAnchor="middle">Sredozemsko morje</text>
        {/* Snow caps */}
        <polygon points="70,75 80,60 90,75" fill="white" />
        <polygon points="170,68 180,50 190,68" fill="white" />
        <polygon points="270,73 280,55 290,73" fill="white" />
      </svg>
    </div>
  );
}

function VolcanoDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Presek vulkana</p>
      <svg viewBox="0 0 300 220" className="w-full max-w-xs mx-auto" style={{ minHeight: '160px' }}>
        <rect x="0" y="0" width="300" height="220" fill="#fef3c7" rx="8" />
        {/* Ground */}
        <rect x="0" y="180" width="300" height="40" fill="#92400e" rx="0" />
        {/* Magma chamber */}
        <ellipse cx="150" cy="190" rx="40" ry="15" fill="#ef4444" />
        <text x="150" y="195" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">Magma</text>
        {/* Pipe */}
        <rect x="135" y="120" width="30" height="60" fill="#7f1d1d" />
        {/* Cone */}
        <polygon points="80,180 150,40 220,180" fill="#a16207" stroke="#713f12" strokeWidth="2" />
        {/* Crater */}
        <ellipse cx="150" cy="120" rx="20" ry="6" fill="#450a0a" />
        <text x="150" y="115" fill="#fff" fontSize="8" textAnchor="middle">Krater</text>
        {/* Lava flow */}
        <path d="M150,125 Q170,150 200,170" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
        <text x="210" y="165" fill="#b91c1c" fontSize="9" fontWeight="500">Lava</text>
        {/* Labels */}
        <text x="230" y="100" fill="#713f12" fontSize="10" fontWeight="500">Vulkanski stožec</text>
        <line x1="220" y1="105" x2="180" y2="120" stroke="#713f12" strokeWidth="1" />
      </svg>
    </div>
  );
}

function MediterraneanDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Sredozemsko morje in povezave</p>
      <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto" style={{ minHeight: '160px' }}>
        <rect x="0" y="0" width="400" height="220" fill="#e0f2fe" rx="8" />
        {/* Mediterranean Sea */}
        <ellipse cx="200" cy="110" rx="160" ry="80" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
        <text x="200" y="115" fill="#1e3a8a" fontSize="14" fontWeight="bold" textAnchor="middle">Sredozemsko morje</text>
        {/* Europe */}
        <path d="M120,30 L280,30 L300,60 L280,90 L200,80 L120,90 L100,60 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1.5" />
        <text x="200" y="65" fill="#064e3b" fontSize="10" textAnchor="middle" fontWeight="500">Evropa</text>
        {/* Africa */}
        <path d="M100,140 L300,140 L320,170 L280,200 L120,200 L80,170 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="200" y="175" fill="#78350f" fontSize="10" textAnchor="middle" fontWeight="500">Afrika</text>
        {/* Asia */}
        <path d="M280,60 L360,50 L380,80 L360,120 L300,100 Z" fill="#f87171" stroke="#ef4444" strokeWidth="1.5" />
        <text x="340" y="85" fill="#7f1d1d" fontSize="9" textAnchor="middle" fontWeight="500">Azija</text>
        {/* Straits */}
        <text x="40" y="115" fill="#1e40af" fontSize="9" fontWeight="500">Gibraltarska</text>
        <text x="40" y="125" fill="#1e40af" fontSize="9" fontWeight="500">vrata</text>
        <text x="340" y="115" fill="#1e40af" fontSize="9" fontWeight="500">Sueški</text>
        <text x="340" y="125" fill="#1e40af" fontSize="9" fontWeight="500">prekop</text>
      </svg>
    </div>
  );
}

function AlpineZonesDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Višinski pasovi v Alpah</p>
      <svg viewBox="0 0 300 260" className="w-full max-w-xs mx-auto" style={{ minHeight: '200px' }}>
        <rect x="0" y="0" width="300" height="260" fill="#f0fdf4" rx="8" />
        {/* Mountain */}
        <polygon points="50,240 150,30 250,240" fill="#64748b" stroke="#475569" strokeWidth="2" />
        {/* Snow line */}
        <polygon points="105,120 150,30 195,120" fill="white" opacity="0.9" />
        <text x="150" y="75" fill="#374151" fontSize="9" textAnchor="middle" fontWeight="bold">Večni sneg</text>
        <text x="150" y="85" fill="#374151" fontSize="8" textAnchor="middle">nad 3000 m</text>
        {/* Alpine meadows */}
        <path d="M80,180 Q150,160 220,180 L230,200 L70,200 Z" fill="#86efac" opacity="0.7" />
        <text x="150" y="190" fill="#14532d" fontSize="9" textAnchor="middle" fontWeight="500">Pašniki (500-1200m)</text>
        {/* Forest line */}
        <path d="M65,140 Q150,120 235,140 L240,160 L60,160 Z" fill="#22c55e" opacity="0.7" />
        <text x="150" y="150" fill="#14532d" fontSize="9" textAnchor="middle" fontWeight="500">Gozd (800-2000m)</text>
        {/* Height labels */}
        <line x1="255" y1="240" x2="255" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <text x="265" y="235" fill="#64748b" fontSize="8">500 m</text>
        <text x="265" y="180" fill="#64748b" fontSize="8">1500 m</text>
        <text x="265" y="120" fill="#64748b" fontSize="8">2500 m</text>
        <text x="265" y="50" fill="#64748b" fontSize="8">3500 m</text>
      </svg>
    </div>
  );
}

function PannonianBasinDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Nastanek Panonske kotline</p>
      <svg viewBox="0 0 400 180" className="w-full max-w-md mx-auto" style={{ minHeight: '130px' }}>
        <rect x="0" y="0" width="400" height="180" fill="#fefce8" rx="8" />
        {/* Alps */}
        <polygon points="40,100 80,40 120,100" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        <text x="80" y="115" fill="#475569" fontSize="9" textAnchor="middle" fontWeight="500">Alpe</text>
        {/* Basin */}
        <ellipse cx="200" cy="110" rx="100" ry="35" fill="#fde047" stroke="#eab308" strokeWidth="2" />
        <text x="200" y="115" fill="#713f12" fontSize="11" fontWeight="bold" textAnchor="middle">Panonska kotlina</text>
        {/* Carpathians */}
        <polygon points="280,100 320,45 360,100" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        <text x="320" y="115" fill="#475569" fontSize="9" textAnchor="middle" fontWeight="500">Karpati</text>
        {/* Arrows showing subsidence */}
        <line x1="200" y1="30" x2="200" y2="75" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
        <text x="200" y="25" fill="#b91c1c" fontSize="9" textAnchor="middle" fontWeight="500">Tektonsko ugreznjenje</text>
        {/* Water */}
        <ellipse cx="200" cy="110" rx="70" ry="20" fill="#93c5fd" opacity="0.5" />
        <text x="200" y="145" fill="#1e40af" fontSize="9" textAnchor="middle">Nekdanje Panonsko morje</text>
        <defs>
          <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function RiversDiagram() {
  return (
    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Slika: Pomembne reke Srednje Evrope</p>
      <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" style={{ minHeight: '140px' }}>
        <rect x="0" y="0" width="400" height="200" fill="#eff6ff" rx="8" />
        {/* Danube */}
        <path d="M50,50 Q120,80 180,70 Q240,60 300,90 Q350,110 380,100" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
        <text x="200" y="55" fill="#1e40af" fontSize="11" fontWeight="bold">Donava → Črno morje</text>
        {/* Rhine */}
        <path d="M80,40 Q140,60 180,50 Q220,40 280,55 Q320,65 350,45" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="200" y="35" fill="#0e7490" fontSize="10" fontWeight="bold">Ren → Severno morje</text>
        {/* Tributaries */}
        <path d="M150,30 L165,65" stroke="#60a5fa" strokeWidth="2" fill="none" />
        <text x="130" y="25" fill="#2563eb" fontSize="8">Sava</text>
        <path d="M220,25 L215,60" stroke="#60a5fa" strokeWidth="2" fill="none" />
        <text x="225" y="22" fill="#2563eb" fontSize="8">Drava</text>
        <path d="M280,30 L290,80" stroke="#60a5fa" strokeWidth="2" fill="none" />
        <text x="285" y="22" fill="#2563eb" fontSize="8">Tisa</text>
        {/* Seas */}
        <ellipse cx="380" cy="100" rx="15" ry="10" fill="#1e3a5f" />
        <text x="380" y="130" fill="#1e3a8a" fontSize="9" textAnchor="middle">Črno morje</text>
        <ellipse cx="350" cy="45" rx="12" ry="8" fill="#1e3a5f" />
        <text x="350" y="25" fill="#1e3a8a" fontSize="9" textAnchor="middle">Severno morje</text>
      </svg>
    </div>
  );
}
