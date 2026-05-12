import { useState } from 'react';
import { ArrowUpDown, Mountain, Flame, Droplets, Check, X, RefreshCw } from 'lucide-react';

// === ALPINE ZONES GAME ===
const alpineZones = [
  { label: 'Večni sneg in led', height: 'nad 3000 m', order: 1 },
  { label: 'Ruševje in skalnata površja', height: '2500–3000 m', order: 2 },
  { label: 'Iglasti gozd (smreka, jelka)', height: '1500–2000 m', order: 3 },
  { label: 'Listnati gozd (bukev, javor)', height: '800–1500 m', order: 4 },
  { label: 'Pašniki in travniki', height: '500–1200 m', order: 5 },
];

// === VOLCANO BUILDER ===
interface VolcanoPart {
  id: string;
  label: string;
  correct: string;
}

const volcanoParts: VolcanoPart[] = [
  { id: 'magma', label: 'Magma (v notranjosti)', correct: 'vnot' },
  { id: 'stopec', label: 'Vulkanski stožec', correct: 'stope' },
  { id: 'krater', label: 'Žrelo / krater', correct: 'vrh' },
  { id: 'lava', label: 'Lava (teče po pobočju)', correct: 'lavaflow' },
];

// === POLLUTION TABLE ===
const pollutionData = [
  { cause: 'Pritočni onesnaženih rek', explanation: 'Reka Pad teče skozi industrializirane in intenzivno obdelane pokrajine.', effect: 'Onesnažena obala, neprimerna voda za kopanje, ogroženost turizma.' },
  { cause: 'Množični turizem', explanation: 'Samo poleti pride na obale okrog 200 milijonov turistov.', effect: 'Pomanjkanje neonesnažene narave za počitek.' },
  { cause: 'Gosto poseljena obala', explanation: 'Na 46.000 km obale živi več kot 143 milijonov ljudi.', effect: 'Gospodinjske in industrijske odplake, cvetenje morja.' },
  { cause: 'Pretiran ulov rib', explanation: 'Uporaba koč uničuje morsko dno.', effect: 'Grozi izumrtje navadnega tuna, uničeni ekosistemi v Tržaškem zalivu.' },
  { cause: 'Ladijski promet', explanation: 'Izvržejo odpadke, pomanjkanje naprav za čiščenje odpadnih olj.', effect: 'Razlitje nafte, pogin morskih živali, ekološka škoda.' },
];

export default function Games() {
  const [activeGame, setActiveGame] = useState<'zones' | 'volcano' | 'pollution'>('zones');

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Mini-igre</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Utrjuj znanje skozi interaktivne aktivnosti.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveGame('zones')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'zones' ? 'text-white' : ''}`} style={activeGame === 'zones' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Mountain size={14} className="inline mr-1" /> Višinski pasovi v Alpah
        </button>
        <button onClick={() => setActiveGame('volcano')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'volcano' ? 'text-white' : ''}`} style={activeGame === 'volcano' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Flame size={14} className="inline mr-1" /> Sestavi vulkan
        </button>
        <button onClick={() => setActiveGame('pollution')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'pollution' ? 'text-white' : ''}`} style={activeGame === 'pollution' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Droplets size={14} className="inline mr-1" /> Onesnaževanje morja
        </button>
      </div>

      {activeGame === 'zones' && <AlpineZonesGame />}
      {activeGame === 'volcano' && <VolcanoGame />}
      {activeGame === 'pollution' && <PollutionTable />}
    </div>
  );
}

function AlpineZonesGame() {
  const [items, setItems] = useState([...alpineZones].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);

  const moveItem = (index: number, dir: number) => {
    if (checked) return;
    const newItems = [...items];
    const target = index + dir;
    if (target < 0 || target >= newItems.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    setItems(newItems);
  };

  const isCorrect = items.every((item, i) => item.order === i + 1);

  return (
    <div className="card space-y-4">
      <h3 className="font-semibold">Uredi rastlinske višinske pasove</h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Uredi pasove od najnižjega proti najvišjega (od 500 m do večnega snega).
      </p>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2 p-3 rounded-lg border" style={{ background: checked ? (item.order === idx + 1 ? '#22c55e15' : '#ef444415') : 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex-1">
              <div className="font-medium text-sm">{item.label}</div>
              {checked && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.height}</div>}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveItem(idx, -1)} disabled={checked} className="p-1 rounded" style={{ background: 'var(--bg-primary)' }}><ArrowUpDown size={14} /></button>
              <button onClick={() => moveItem(idx, 1)} disabled={checked} className="p-1 rounded" style={{ background: 'var(--bg-primary)' }}><ArrowUpDown size={14} className="rotate-180" /></button>
            </div>
            {checked && (item.order === idx + 1 ? <Check size={16} style={{ color: 'var(--success)' }} /> : <X size={16} style={{ color: 'var(--danger)' }} />)}
          </div>
        ))}
      </div>
      {!checked ? (
        <button onClick={() => setChecked(true)} className="btn-primary text-sm inline-flex items-center gap-1.5">
          <Check size={14} /> Preveri
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
            {isCorrect ? 'Pravilno urejeno!' : 'Nekateri pasovi niso na pravem mestu.'}
          </p>
          <button onClick={() => { setItems([...alpineZones].sort(() => Math.random() - 0.5)); setChecked(false); }} className="btn-secondary text-sm inline-flex items-center gap-1.5">
            <RefreshCw size={14} /> Ponovi
          </button>
        </div>
      )}
    </div>
  );
}

function VolcanoGame() {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const targets = [
    { id: 'vnot', label: 'Notranjost (pod površjem)' },
    { id: 'stope', label: 'Pobočje in osnova' },
    { id: 'vrh', label: 'Vrh vulkana' },
    { id: 'lavaflow', label: 'Tekoča lava po pobočju' },
  ];

  const placePart = (partId: string, targetId: string) => {
    if (checked) return;
    setPlaced(prev => ({ ...prev, [partId]: targetId }));
  };

  const allPlaced = volcanoParts.every(p => placed[p.id]);

  return (
    <div className="card space-y-4">
      <h3 className="font-semibold">Sestavi vulkan</h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Povleci vsak del vulkana na pravilno mesto na shemi.
      </p>

      {/* Draggable parts */}
      <div className="grid grid-cols-2 gap-2">
        {volcanoParts.map(part => (
          <button
            key={part.id}
            onClick={() => {
              if (checked) return;
              const unplacedTarget = targets.find(t => !Object.values(placed).includes(t.id));
              if (unplacedTarget) placePart(part.id, unplacedTarget.id);
            }}
            disabled={checked || !!placed[part.id]}
            className="p-2 rounded-lg text-xs font-medium text-center border disabled:opacity-50"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            {part.label}
            {placed[part.id] && <Check size={12} className="inline ml-1" style={{ color: 'var(--success)' }} />}
          </button>
        ))}
      </div>

      {/* Drop targets */}
      <div className="space-y-2">
        {targets.map(target => {
          const assigned = Object.entries(placed).find(([, v]) => v === target.id);
          const part = assigned ? volcanoParts.find(p => p.id === assigned[0]) : null;
          return (
            <div key={target.id} className="p-3 rounded-lg border text-sm" style={{ borderColor: 'var(--border-color)', background: checked && part ? (part.correct === target.id ? '#22c55e15' : '#ef444415') : 'var(--bg-primary)' }}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{target.label}</span>
                {part && <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg-secondary)' }}>{part.label}</span>}
                {checked && part && (part.correct === target.id ? <Check size={16} style={{ color: 'var(--success)' }} /> : <X size={16} style={{ color: 'var(--danger)' }} />)}
              </div>
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button onClick={() => setChecked(true)} disabled={!allPlaced} className="btn-primary text-sm inline-flex items-center gap-1.5">
          <Check size={14} /> Preveri
        </button>
      ) : (
        <button onClick={() => { setPlaced({}); setChecked(false); }} className="btn-secondary text-sm inline-flex items-center gap-1.5">
          <RefreshCw size={14} /> Ponovi
        </button>
      )}
    </div>
  );
}

function PollutionTable() {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    setRevealed(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const allRevealed = revealed.length === pollutionData.length;

  return (
    <div className="card space-y-4">
      <h3 className="font-semibold">Vzroki in posledice onesnaževanja Sredozemskega morja</h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Klikni na vsako vrstico, da razkriješ razlago in posledico.
      </p>

      <div className="space-y-2">
        {pollutionData.map((row, idx) => {
          const isRevealed = revealed.includes(idx);
          return (
            <div key={idx} className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => toggleRow(idx)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium flex items-center justify-between"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <span><Flame size={14} className="inline mr-1.5" style={{ color: 'var(--danger)' }} />{row.cause}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{isRevealed ? 'Skrij' : 'Pokaži'}</span>
              </button>
              {isRevealed && (
                <div className="px-3 py-2 space-y-1 text-xs" style={{ background: 'var(--bg-primary)' }}>
                  <p style={{ color: 'var(--text-secondary)' }}><strong>Razlaga:</strong> {row.explanation}</p>
                  <p style={{ color: 'var(--danger)' }}><strong>Posledica:</strong> {row.effect}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setRevealed(allRevealed ? [] : pollutionData.map((_, i) => i))}
        className="btn-secondary text-sm inline-flex items-center gap-1.5"
      >
        {allRevealed ? <RefreshCw size={14} /> : <Check size={14} />}
        {allRevealed ? 'Skrij vse' : 'Razkrij vse'}
      </button>
    </div>
  );
}
