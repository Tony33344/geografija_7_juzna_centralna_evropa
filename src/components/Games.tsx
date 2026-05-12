import { useState, useEffect } from 'react';
import { ArrowUpDown, Mountain, Flame, Droplets, Check, X, RefreshCw, Star, Trophy, Zap, Sparkles } from 'lucide-react';

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

// === MEMORY CARDS ===
const memoryPairs = [
  { id: 1, term: 'Alpe', match: 'Najvišje gorstvo Evrope' },
  { id: 2, term: 'Apenini', match: 'Italijanski polotok' },
  { id: 3, term: 'Karpati', match: 'Vzhodna Evropa' },
  { id: 4, term: 'Pireneji', match: 'Španija-Francija' },
  { id: 5, term: 'Sredozemlje', match: 'Toplo morje' },
  { id: 6, term: 'Jadransko morje', match: 'Med Italijo in Balkanom' },
  { id: 7, term: 'Črno morje', match: 'Med Turčijo in Balkanom' },
  { id: 8, term: 'Donava', match: 'Druga najdaljša reka Evrope' },
];

// === COUNTRY-CAPITAL MATCHING ===
const countryCapitals = [
  { country: 'Slovenija', capital: 'Ljubljana' },
  { country: 'Hrvaška', capital: 'Zagreb' },
  { country: 'Srbija', capital: 'Beograd' },
  { country: 'Bosna in Hercegovina', capital: 'Sarajevo' },
  { country: 'Črna gora', capital: 'Podgorica' },
  { country: 'Severna Makedonija', capital: 'Skopje' },
  { country: 'Grčija', capital: 'Atene' },
  { country: 'Bolgarija', capital: 'Sofija' },
  { country: 'Romunija', capital: 'Bukarešta' },
  { country: 'Madžarska', capital: 'Budimpešta' },
];

// === WORD SEARCH ===
const wordSearchGrid = [
  ['A', 'L', 'P', 'E', 'I', 'R', 'M', 'E', 'D', 'I'],
  ['D', 'O', 'N', 'A', 'V', 'A', 'O', 'O', 'R', 'J'],
  ['R', 'R', 'I', 'A', 'T', 'R', 'Z', 'S', 'A', 'A'],
  ['I', 'I', 'N', 'E', 'N', 'E', 'N', 'E', 'V', 'D'],
  ['A', 'J', 'I', 'N', 'A', 'K', 'I', 'G', 'A', 'N'],
  ['T', 'A', 'S', 'I', 'S', 'I', 'R', 'A', 'P', 'A'],
  ['I', 'K', 'O', 'A', 'R', 'P', 'A', 'T', 'I', 'N'],
  ['C', 'O', 'R', 'S', 'I', 'K', 'A', 'L', 'I', 'O'],
  ['S', 'T', 'R', 'A', 'I', 'T', 'S', 'R', 'K', 'N'],
  ['K', 'R', 'A', 'T', 'I', 'B', 'A', 'L', 'A', 'K'],
];

const wordSearchWords = [
  { word: 'ALPE', found: false, hint: 'Najvišje gorstvo Evrope' },
  { word: 'DONAVA', found: false, hint: 'Reka, ki teče skozi več držav' },
  { word: 'SREDNEMORJE', found: false, hint: 'Med Afriko, Azijo in Evropo' },
  { word: 'KARPATI', found: false, hint: 'Gorovje v vzhodni Evropi' },
  { word: 'KORZIKA', found: false, hint: 'Francoski otok v Sredozemlju' },
  { word: 'ADRIATIK', found: false, hint: 'Morje med Italijo in Balkanom' },
];

export default function Games() {
  const [activeGame, setActiveGame] = useState<'zones' | 'volcano' | 'pollution' | 'memory' | 'matching' | 'wordsearch'>('zones');

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Mini-igre</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Utrjuj znanje skozi interaktivne aktivnosti. Zbiraj točke in odkleni dosežke!
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveGame('zones')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'zones' ? 'text-white' : ''}`} style={activeGame === 'zones' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Mountain size={14} className="inline mr-1" /> Višinski pasovi
        </button>
        <button onClick={() => setActiveGame('volcano')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'volcano' ? 'text-white' : ''}`} style={activeGame === 'volcano' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Flame size={14} className="inline mr-1" /> Sestavi vulkan
        </button>
        <button onClick={() => setActiveGame('pollution')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'pollution' ? 'text-white' : ''}`} style={activeGame === 'pollution' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Droplets size={14} className="inline mr-1" /> Onesnaževanje morja
        </button>
        <button onClick={() => setActiveGame('memory')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'memory' ? 'text-white' : ''}`} style={activeGame === 'memory' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Sparkles size={14} className="inline mr-1" /> Spominske kartice
        </button>
        <button onClick={() => setActiveGame('matching')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'matching' ? 'text-white' : ''}`} style={activeGame === 'matching' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Star size={14} className="inline mr-1" /> Države - Mesta
        </button>
        <button onClick={() => setActiveGame('wordsearch')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'wordsearch' ? 'text-white' : ''}`} style={activeGame === 'wordsearch' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Zap size={14} className="inline mr-1" /> Iskanje besed
        </button>
      </div>

      {activeGame === 'zones' && <AlpineZonesGame />}
      {activeGame === 'volcano' && <VolcanoGame />}
      {activeGame === 'pollution' && <PollutionTable />}
      {activeGame === 'memory' && <MemoryGame />}
      {activeGame === 'matching' && <CapitalMatchingGame />}
      {activeGame === 'wordsearch' && <WordSearchGame />}
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

function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; content: string; matched: boolean; flipped: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const allCards = memoryPairs.flatMap(p => [
      { id: p.id * 2, content: p.term, matched: false, flipped: false },
      { id: p.id * 2 + 1, content: p.match, matched: false, flipped: false },
    ]);
    setCards(allCards.sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (id: number) => {
    if (flipped.length === 2 || cards[id].matched || cards[id].flipped) return;

    const newFlipped = [...flipped, id];
    const newCards = [...cards];
    newCards[id].flipped = true;
    setFlipped(newFlipped);
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].content === cards[second].content) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlipped([]);
        if (newCards.every(c => c.matched)) setCompleted(true);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const allCards = memoryPairs.flatMap(p => [
      { id: p.id * 2, content: p.term, matched: false, flipped: false },
      { id: p.id * 2 + 1, content: p.match, matched: false, flipped: false },
    ]);
    setCards(allCards.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMoves(0);
    setCompleted(false);
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Spominske kartice</h3>
        <div className="flex items-center gap-3">
          <div className="streak-counter" style={{ background: 'var(--bg-secondary)' }}>
            <span className="streak-fire">🔥</span> {moves} potez
          </div>
        </div>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Poišči ujemajoče pare (gorstvo - lokacija, morje - opis).
      </p>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => flipCard(idx)}
            disabled={card.matched || flipped.length === 2}
            className={`aspect-square rounded-lg text-xs font-medium flex items-center justify-center p-2 transition-all ${card.flipped ? 'animate-pulse' : ''}`}
            style={{
              background: card.flipped || card.matched ? 'var(--accent)' : 'var(--bg-secondary)',
              color: card.flipped || card.matched ? '#fff' : 'var(--text-muted)',
              opacity: card.matched ? 0.5 : 1,
              transform: card.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {card.flipped || card.matched ? card.content : '?'}
          </button>
        ))}
      </div>

      {completed && (
        <div className="text-center py-3 animate-fade-in" style={{ background: '#22c55e15' }}>
          <div className="badge badge-gold mb-2">
            <Star size={12} /> KONČANO!
          </div>
          <p className="font-medium" style={{ color: 'var(--success)' }}>
            <Trophy size={16} className="inline mr-1" /> {moves} potez
          </p>
          <button onClick={resetGame} className="btn-primary text-sm mt-2 inline-flex items-center gap-1.5">
            <RefreshCw size={14} /> Nova igra
          </button>
        </div>
      )}
    </div>
  );
}

function CapitalMatchingGame() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selectedCapital, setSelectedCapital] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledCapitals, setShuffledCapitals] = useState<string[]>([]);

  useEffect(() => {
    setShuffledCapitals([...countryCapitals.map(c => c.capital)].sort(() => Math.random() - 0.5));
  }, [current]);

  const handleCapitalClick = (capital: string) => {
    if (feedback) return;
    setSelectedCapital(capital);
    const correct = countryCapitals[current].capital === capital;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (correct && current < countryCapitals.length - 1) {
        setCurrent(c => c + 1);
        setSelectedCapital(null);
        setFeedback(null);
      } else if (correct) {
        setSelectedCapital(null);
        setFeedback(null);
      } else {
        setFeedback(null);
      }
    }, 1000);
  };

  const resetGame = () => {
    setScore(0);
    setCurrent(0);
    setSelectedCapital(null);
    setFeedback(null);
  };

  if (current >= countryCapitals.length) {
    const percentage = Math.round((score / countryCapitals.length) * 100);
    const badgeClass = percentage >= 80 ? 'badge-gold' : percentage >= 60 ? 'badge-silver' : 'badge-bronze';
    return (
      <div className="card text-center py-6 animate-fade-in">
        <h3 className="font-semibold mb-2">Države - Mesta</h3>
        <p className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{score} / {countryCapitals.length}</p>
        <div className={`badge ${badgeClass} mb-4`}>
          <Star size={12} /> {percentage}% natančnost
        </div>
        <button onClick={resetGame} className="btn-primary text-sm inline-flex items-center gap-1.5">
          <RefreshCw size={14} /> Nova igra
        </button>
      </div>
    );
  }

  const country = countryCapitals[current];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Države - Mesta</h3>
        <div className="flex items-center gap-2">
          <div className="streak-counter" style={{ background: 'var(--bg-secondary)' }}>
            <span className="streak-fire">🔥</span> {score} točk
          </div>
        </div>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Izberi pravilno glavno mesto za vsako državo.
      </p>

      <div className="text-center py-6 animate-pulse" style={{ background: 'var(--bg-secondary)' }}>
        <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{country.country}</div>
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Katero je glavno mesto?</div>
      </div>

      {feedback && (
        <div className={`text-center py-2 text-sm font-medium ${feedback === 'correct' ? 'animate-bounce' : 'animate-shake'}`} style={{ background: feedback === 'correct' ? '#22c55e15' : '#ef444415', color: feedback === 'correct' ? 'var(--success)' : 'var(--danger)' }}>
          {feedback === 'correct' ? <><Check size={14} className="inline mr-1" /> Pravilno!</> : <><X size={14} className="inline mr-1" /> Napačno! {country.capital}</>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {shuffledCapitals.slice(0, 4).map(capital => (
          <button
            key={capital}
            onClick={() => handleCapitalClick(capital)}
            disabled={!!feedback}
            className="p-3 rounded-lg text-sm font-medium transition-all"
            style={{
              background: selectedCapital === capital ? 'var(--accent)' : 'var(--bg-secondary)',
              color: selectedCapital === capital ? '#fff' : 'var(--text-primary)',
              opacity: feedback ? 0.5 : 1,
            }}
          >
            {capital}
          </button>
        ))}
      </div>

      <button onClick={resetGame} className="btn-secondary text-sm inline-flex items-center gap-1.5">
        <RefreshCw size={14} /> Ponovi
      </button>
    </div>
  );
}

function WordSearchGame() {
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [currentSelection, setCurrentSelection] = useState<[number, number][]>([]);

  const toggleCell = (row: number, col: number) => {
    if (currentSelection.length === 0) {
      setCurrentSelection([[row, col]]);
    } else {
      const [lastRow, lastCol] = currentSelection[currentSelection.length - 1];
      const isAdjacent = Math.abs(row - lastRow) <= 1 && Math.abs(col - lastCol) <= 1;
      const isSameDirection = currentSelection.length > 1 &&
        (row - currentSelection[currentSelection.length - 2][0] === lastRow - currentSelection[currentSelection.length - 2][0]) &&
        (col - currentSelection[currentSelection.length - 2][1] === lastCol - currentSelection[currentSelection.length - 2][1]);

      if (isAdjacent && isSameDirection) {
        setCurrentSelection([...currentSelection, [row, col]]);
      } else if (currentSelection.length === 1 && isAdjacent) {
        setCurrentSelection([...currentSelection, [row, col]]);
      } else {
        checkWord();
        setCurrentSelection([[row, col]]);
      }
    }
  };

  const checkWord = () => {
    if (currentSelection.length < 2) return;
    const word = currentSelection.map(([r, c]) => wordSearchGrid[r][c]).join('');
    const matched = wordSearchWords.find(w => w.word === word);
    if (matched && !foundWords.has(word)) {
      setFoundWords(prev => new Set([...prev, word]));
      setSelectedCells(prev => [...prev, ...currentSelection]);
    }
  };

  const allFound = wordSearchWords.every(w => foundWords.has(w.word));

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Iskanje besed</h3>
        <div className="flex items-center gap-2">
          <div className="streak-counter" style={{ background: 'var(--bg-secondary)' }}>
            <span className="streak-fire">🔥</span> {foundWords.size} / {wordSearchWords.length}
          </div>
        </div>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Poišči skrite besede v mreži. Klikni na začetno in končno črko besede.
      </p>

      <div className="grid grid-cols-10 gap-0.5" style={{ maxWidth: 'fit-content', margin: '0 auto' }}>
        {wordSearchGrid.map((row, r) =>
          row.map((letter, c) => {
            const isSelected = currentSelection.some(([sr, sc]) => sr === r && sc === c);
            const isFound = selectedCells.some(([sr, sc]) => sr === r && sc === c);
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => toggleCell(r, c)}
                className={`w-8 h-8 text-xs font-bold flex items-center justify-center rounded transition-all ${isSelected ? 'animate-pulse' : ''}`}
                style={{
                  background: isFound ? 'var(--success)' : isSelected ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: isFound ? '#fff' : isSelected ? '#fff' : 'var(--text-primary)',
                }}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {wordSearchWords.map(({ word, hint }) => {
          const found = foundWords.has(word);
          return (
            <div key={word} className={`p-2 rounded ${found ? 'animate-fade-in' : ''}`} style={{ background: found ? '#22c55e15' : 'var(--bg-secondary)', opacity: found ? 1 : 0.6 }}>
              <div className="font-medium">{found ? <Check size={12} className="inline mr-1" style={{ color: 'var(--success)' }} /> : ''}{word}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{hint}</div>
            </div>
          );
        })}
      </div>

      {allFound && (
        <div className="text-center py-3 animate-fade-in" style={{ background: '#22c55e15' }}>
          <div className="badge badge-gold mb-2">
            <Star size={12} /> VSE BESDE!
          </div>
          <p className="font-medium" style={{ color: 'var(--success)' }}>
            <Trophy size={16} className="inline mr-1" /> KONČANO!
          </p>
          <button onClick={() => { setSelectedCells([]); setCurrentSelection([]); setFoundWords(new Set()); }} className="btn-primary text-sm mt-2 inline-flex items-center gap-1.5">
            <RefreshCw size={14} /> Nova igra
          </button>
        </div>
      )}
    </div>
  );
}
