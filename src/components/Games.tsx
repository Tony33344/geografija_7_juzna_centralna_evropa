import { useState, useEffect, useRef } from 'react';
import { ArrowUpDown, Mountain, Flame, Droplets, Check, X, RefreshCw, Star, Trophy, Zap, Sparkles, Clock, Globe, MapPin, Award, Timer } from 'lucide-react';

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

// === GEOGRAPHY TRIVIA ===
const triviaFacts = [
  { fact: 'Donava teče skozi 9 držav — več kot katera koli druga reka na svetu!', icon: '🌊' },
  { fact: 'Sredozemsko morje je dolgo približno 3.800 km — to je razdalja od Slovenije do Kanade!', icon: '🌍' },
  { fact: 'Alpe so nastale pred približno 30 milijoni let, ko sta trčili Afriška in Evropska plošča.', icon: '⛰️' },
  { fact: 'Vezuv je leta 79 n. št. uničil mesto Pompeji. Še vedno je aktiven vulkan!', icon: '🌋' },
  { fact: 'Panonsko morje je nekoč prekrivalo celotno Panonsko nižino. Ostanek je Blatno jezero.', icon: '💧' },
  { fact: 'Gibraltarska vrata so široka le 14 km — to je ožje od razdalje Ljubljana-Domžale!', icon: '🚢' },
  { fact: 'V Sredozemskem morju živi več kot 17.000 vrst morskih organizmov.', icon: '🐠' },
  { fact: 'Alpe so najvišje gorstvo Evrope — najvišji vrh Mont Blanc meri 4.810 m.', icon: '🏔️' },
  { fact: 'Ren je najbolj prometna reka v Evropi — letno prepelje več kot 200 milijonov ton tovora!', icon: '⚓' },
  { fact: 'Samo poleti obišče Sredozemlje okrog 200 milijonov turistov — to je 3x več kot prebivalcev Francije!', icon: '🏖️' },
];

// === TIMED CHALLENGE ===
const timedQuestions = [
  { question: 'Katero gorovje je najvišje v Evropi?', answer: 'Alpe', options: ['Alpe', 'Karpati', 'Pireneji', 'Apenini'] },
  { question: 'Skozi koliko držav teče Donava?', answer: '9', options: ['5', '7', '9', '11'] },
  { question: 'Kateri vulkan je uničil Pompeje?', answer: 'Vezuv', options: ['Etna', 'Vezuv', 'Stromboli', 'Kilimandžaro'] },
  { question: 'Kaj je makija?', answer: 'Zimzeleno grmičevje', options: ['Vrsta ribe', 'Zimzeleno grmičevje', 'Vulkanska kamnina', 'Vrsta podnebja'] },
  { question: 'Katera reka teče skozi Padska nižino?', answer: 'Pad', options: ['Donava', 'Ren', 'Pad', 'Sava'] },
  { question: 'Koliko držav je v Evropski uniji?', answer: '27', options: ['25', '27', '28', '30'] },
  { question: 'Kaj je puhlica?', answer: 'Sedimentna kamnina', options: ['Vrsta rastline', 'Sedimentna kamnina', 'Vulkanski pepel', 'Morski tok'] },
  { question: 'Kje leži Blatno jezero?', answer: 'Madžarska', options: ['Slovenija', 'Hrvaška', 'Madžarska', 'Srbija'] },
  { question: 'Kaj je epicenter?', answer: 'Točka najmočnejših sunkov', options: ['Središče Zemlje', 'Točka najmočnejših sunkov', 'Vrh vulkana', 'Morska ožina'] },
  { question: 'Kateri otok je največji v Sredozemlju?', answer: 'Sicilija', options: ['Korzika', 'Sardinija', 'Sicilija', 'Kreta'] },
];

// === COUNTRY EXPLORER ===
const countryFacts = [
  { country: 'Slovenija', capital: 'Ljubljana', population: '2,1 milijona', area: '20.273 km²', fact: 'Ena redkih držav, ki leži na stičišču Alp, Sredozemlja, Panonske nižine in Dinarskega gorstva.', flag: '🇸🇮' },
  { country: 'Italija', capital: 'Rim', population: '59 milijonov', area: '301.340 km²', fact: 'Ima največ Unescovih spomenikov na svetu — kar 58!', flag: '🇮🇹' },
  { country: 'Španija', capital: 'Madrid', population: '47 milijonov', area: '505.990 km²', fact: 'Ima največ vinogradov na svetu, a je šele tretja po pridelavi vina.', flag: '🇪🇸' },
  { country: 'Francija', capital: 'Pariz', population: '68 milijonov', area: '643.801 km²', fact: 'Največja država v EU po površini in najbolj obiskana država na svetu.', flag: '🇫🇷' },
  { country: 'Nemčija', capital: 'Berlin', population: '84 milijonov', area: '357.022 km²', fact: 'Ima več kot 1.500 različnih vrst piva in najstarejšo univerzo v Evropi (Heidelberg, 1386).', flag: '🇩🇪' },
  { country: 'Avstrija', capital: 'Dunaj', population: '9 milijonov', area: '83.871 km²', fact: 'Dunaj je bil 8x zapored izbran za najboljše mesto za življenje na svetu.', flag: '🇦🇹' },
  { country: 'Švica', capital: 'Bern', population: '8,7 milijona', area: '41.285 km²', fact: 'Ima 4 uradne jezike in več kot 1.500 jezer — nobena točka ni dlje kot 16 km od jezera!', flag: '🇨🇭' },
  { country: 'Grčija', capital: 'Atene', population: '10,4 milijona', area: '131.957 km²', fact: 'Ima več kot 6.000 otokov, od katerih je poseljenih le 227.', flag: '🇬🇷' },
  { country: 'Hrvaška', capital: 'Zagreb', population: '3,9 milijona', area: '56.594 km²', fact: 'Ima več kot 1.200 otokov in je ena izmed 10 najbolj obiskanih turističnih destinacij.', flag: '🇭🇷' },
  { country: 'Madžarska', capital: 'Budimpešta', population: '9,6 milijona', area: '93.028 km²', fact: 'Budimpešta ima največ termalnih vrelcev na svetu — kar 118!', flag: '🇭🇺' },
];

export default function Games() {
  const [activeGame, setActiveGame] = useState<'zones' | 'volcano' | 'pollution' | 'memory' | 'matching' | 'wordsearch' | 'trivia' | 'timed' | 'explorer'>('zones');

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
        <button onClick={() => setActiveGame('trivia')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'trivia' ? 'text-white' : ''}`} style={activeGame === 'trivia' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Globe size={14} className="inline mr-1" /> Zanimivosti
        </button>
        <button onClick={() => setActiveGame('timed')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'timed' ? 'text-white' : ''}`} style={activeGame === 'timed' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <Timer size={14} className="inline mr-1" /> Proti času
        </button>
        <button onClick={() => setActiveGame('explorer')} className={`text-sm px-3 py-1.5 rounded-lg ${activeGame === 'explorer' ? 'text-white' : ''}`} style={activeGame === 'explorer' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
          <MapPin size={14} className="inline mr-1" /> Raziskuj države
        </button>
      </div>

      {activeGame === 'zones' && <AlpineZonesGame />}
      {activeGame === 'volcano' && <VolcanoGame />}
      {activeGame === 'pollution' && <PollutionTable />}
      {activeGame === 'memory' && <MemoryGame />}
      {activeGame === 'matching' && <CapitalMatchingGame />}
      {activeGame === 'wordsearch' && <WordSearchGame />}
      {activeGame === 'trivia' && <TriviaGame />}
      {activeGame === 'timed' && <TimedChallengeGame />}
      {activeGame === 'explorer' && <CountryExplorerGame />}
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

function TriviaGame() {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  const nextFact = () => {
    if (seen.size >= triviaFacts.length) {
      setSeen(new Set());
    }
    let next;
    do { next = Math.floor(Math.random() * triviaFacts.length); } while (seen.has(next) && seen.size < triviaFacts.length);
    setCurrent(next);
    setSeen(prev => new Set([...prev, next]));
  };

  const fact = triviaFacts[current];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Zanimivosti</h3>
        <span className="badge badge-star"><Award size={12} /> {seen.size} / {triviaFacts.length}</span>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Poišči zanimive podatke o Evropi, ki jih morda še ne poznaš.
      </p>

      <div className="p-6 rounded-xl text-center animate-fade-in" style={{ background: 'var(--bg-secondary)' }}>
        <div className="text-4xl mb-3">{fact.icon}</div>
        <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{fact.fact}</p>
      </div>

      <div className="flex gap-2 justify-center">
        <button onClick={nextFact} className="btn-primary inline-flex items-center gap-1.5">
          <Zap size={14} /> Naslednja zanimivost
        </button>
      </div>
    </div>
  );
}

function TimedChallengeGame() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const shuffled = useRef(timedQuestions.sort(() => Math.random() - 0.5).slice(0, 7));

  const startGame = () => {
    setStarted(true);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setFeedback(null);
    shuffled.current = timedQuestions.sort(() => Math.random() - 0.5).slice(0, 7);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (ans: string) => {
    if (feedback || gameOver) return;
    const correct = ans === shuffled.current[currentQ].answer;
    if (correct) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeout(() => {
      if (currentQ + 1 >= shuffled.current.length) {
        setGameOver(true);
      } else {
        setCurrentQ(prev => prev + 1);
        setTimeLeft(15);
        setFeedback(null);
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              if (timerRef.current) clearInterval(timerRef.current);
              setGameOver(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  if (!started) {
    return (
      <div className="card text-center py-6 space-y-3">
        <h3 className="font-semibold">Izziv proti času</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          7 vprašanj, 15 sekund na vsako. Koliko pravilnih odgovorov uspeš najti?
        </p>
        <button onClick={startGame} className="btn-primary inline-flex items-center gap-1.5">
          <Timer size={16} /> Začni izziv
        </button>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / shuffled.current.length) * 100);
    const badgeClass = percentage >= 80 ? 'badge-gold' : percentage >= 60 ? 'badge-silver' : 'badge-bronze';
    return (
      <div className="card text-center py-6 animate-fade-in space-y-3">
        <h3 className="font-semibold">Izziv končan!</h3>
        <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{score} / {shuffled.current.length}</p>
        <div className={`badge ${badgeClass}`}>
          <Star size={12} /> {percentage}% natančnost
        </div>
        <button onClick={startGame} className="btn-primary text-sm inline-flex items-center gap-1.5">
          <RefreshCw size={14} /> Ponovi
        </button>
      </div>
    );
  }

  const q = shuffled.current[currentQ];
  const progress = ((currentQ) / shuffled.current.length) * 100;

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Izziv proti času</h3>
        <div className="streak-counter" style={{ background: timeLeft <= 5 ? '#ef444415' : 'var(--bg-secondary)', color: timeLeft <= 5 ? 'var(--danger)' : 'var(--text-primary)' }}>
          <Clock size={14} /> {timeLeft}s
        </div>
      </div>

      <div className="w-full rounded-full h-2" style={{ background: 'var(--bg-secondary)' }}>
        <div className="progress-bar h-2 rounded-full" style={{ width: `${progress}%`, background: 'var(--accent)' }} />
      </div>

      <div className="text-center py-4">
        <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Vprašanje {currentQ + 1} / {shuffled.current.length}</div>
        <div className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{q.question}</div>
      </div>

      {feedback && (
        <div className={`text-center py-2 text-sm font-medium ${feedback === 'correct' ? 'animate-bounce' : 'animate-shake'}`} style={{ background: feedback === 'correct' ? '#22c55e15' : '#ef444415', color: feedback === 'correct' ? 'var(--success)' : 'var(--danger)' }}>
          {feedback === 'correct' ? <><Check size={14} className="inline mr-1" /> Pravilno!</> : <><X size={14} className="inline mr-1" /> Napačno!</>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {q.options.map(opt => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={!!feedback}
            className="p-3 rounded-lg text-sm font-medium transition-all"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CountryExplorerGame() {
  const [current, setCurrent] = useState(0);
  const country = countryFacts[current];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Raziskuj države</h3>
        <div className="flex gap-1">
          {countryFacts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ background: i === current ? 'var(--accent)' : 'var(--bg-secondary)' }}
            />
          ))}
        </div>
      </div>

      <div className="text-center py-4 animate-fade-in">
        <div className="text-5xl mb-3">{country.flag}</div>
        <h4 className="text-xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{country.country}</h4>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Glavno mesto: {country.capital}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--bg-secondary)' }}>
          <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Prebivalci</div>
          <div className="font-bold text-lg">{country.population}</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--bg-secondary)' }}>
          <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Površina</div>
          <div className="font-bold text-lg">{country.area}</div>
        </div>
      </div>

      <div className="p-4 rounded-lg" style={{ background: 'var(--accent)10' }}>
        <div className="flex items-center gap-2 mb-1">
          <Zap size={14} style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-semibold uppercase" style={{ color: 'var(--accent)' }}>Zanimivost</span>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{country.fact}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrent(prev => prev === 0 ? countryFacts.length - 1 : prev - 1)}
          className="btn-secondary text-sm"
        >
          ← Prejšnja
        </button>
        <button
          onClick={() => setCurrent(prev => prev === countryFacts.length - 1 ? 0 : prev + 1)}
          className="btn-secondary text-sm"
        >
          Naslednja →
        </button>
      </div>
    </div>
  );
}
