import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Check, X, Trophy, RotateCcw } from 'lucide-react';

interface MapFeature {
  id: string;
  name: string;
  type: 'peninsula' | 'island' | 'sea' | 'strait' | 'mountain' | 'river' | 'country';
  lat: number;
  lng: number;
  coords?: [number, number][];
}

const features: MapFeature[] = [
  { id: 'slovenia', name: 'Slovenija', type: 'country', lat: 46.1512, lng: 14.9955 },
  { id: 'croatia', name: 'Hrvaška', type: 'country', lat: 45.1, lng: 15.2 },
  { id: 'serbia', name: 'Srbija', type: 'country', lat: 44.0165, lng: 21.0059 },
  { id: 'bosnia', name: 'Bosna in Hercegovina', type: 'country', lat: 43.9159, lng: 17.6791 },
  { id: 'montenegro', name: 'Črna gora', type: 'country', lat: 42.7087, lng: 19.3744 },
  { id: 'macedonia', name: 'Severna Makedonija', type: 'country', lat: 41.6086, lng: 21.7453 },
  { id: 'italy', name: 'Italija', type: 'country', lat: 41.8719, lng: 12.5674 },
  { id: 'spain', name: 'Španija', type: 'country', lat: 40.4637, lng: -3.7492 },
  { id: 'portugal', name: 'Portugalska', type: 'country', lat: 39.3999, lng: -8.2245 },
  { id: 'france', name: 'Francija', type: 'country', lat: 46.6034, lng: 1.8883 },
  { id: 'germany', name: 'Nemčija', type: 'country', lat: 51.1657, lng: 10.4515 },
  { id: 'austria', name: 'Avstrija', type: 'country', lat: 47.5162, lng: 14.5501 },
  { id: 'switzerland', name: 'Švica', type: 'country', lat: 46.8182, lng: 8.2275 },
  { id: 'hungary', name: 'Madžarska', type: 'country', lat: 47.1625, lng: 19.5033 },
  { id: 'czechia', name: 'Češka', type: 'country', lat: 49.8175, lng: 15.4730 },
  { id: 'slovakia', name: 'Slovaška', type: 'country', lat: 48.6690, lng: 19.6990 },
  { id: 'poland', name: 'Poljska', type: 'country', lat: 51.9194, lng: 19.1451 },
  { id: 'romania', name: 'Romunija', type: 'country', lat: 45.9432, lng: 24.9668 },
  { id: 'bulgaria', name: 'Bolgarija', type: 'country', lat: 42.7339, lng: 25.4858 },
  { id: 'greece', name: 'Grčija', type: 'country', lat: 39.0742, lng: 21.8243 },
  { id: 'albania', name: 'Albanija', type: 'country', lat: 41.1533, lng: 20.1683 },
  { id: 'turkey', name: 'Turčija', type: 'country', lat: 38.9637, lng: 35.2433 },
  { id: 'uk', name: 'Velika Britanija', type: 'country', lat: 55.3781, lng: -3.4360 },
  { id: 'ireland', name: 'Irska', type: 'country', lat: 53.4129, lng: -8.2439 },
  { id: 'norway', name: 'Norveška', type: 'country', lat: 60.4720, lng: 8.4689 },
  { id: 'sweden', name: 'Švedska', type: 'country', lat: 60.1282, lng: 18.6435 },
  { id: 'denmark', name: 'Danska', type: 'country', lat: 56.2639, lng: 9.5018 },
  { id: 'finland', name: 'Finska', type: 'country', lat: 61.9241, lng: 25.7482 },
  { id: 'ukraine', name: 'Ukrajina', type: 'country', lat: 48.3794, lng: 31.1656 },
  { id: 'netherlands', name: 'Nizozemska', type: 'country', lat: 52.1326, lng: 5.2913 },
  { id: 'belgium', name: 'Belgija', type: 'country', lat: 50.5039, lng: 4.4699 },
  { id: 'scandinavian', name: 'Skandinavski polotok', type: 'peninsula', lat: 63.0, lng: 14.0 },
  { id: 'iberian', name: 'Iberski polotok', type: 'peninsula', lat: 40.0, lng: -5.0 },
  { id: 'apennine', name: 'Apeninski polotok', type: 'peninsula', lat: 42.5, lng: 13.0 },
  { id: 'balkan', name: 'Balkanski polotok', type: 'peninsula', lat: 42.5, lng: 22.0 },
  { id: 'iceland', name: 'Islandija', type: 'island', lat: 64.9631, lng: -19.0208 },
  { id: 'britain', name: 'Britansko otočje', type: 'island', lat: 53.8, lng: -2.5 },
  { id: 'sicily', name: 'Sicilija', type: 'island', lat: 37.5990, lng: 14.0154 },
  { id: 'sardinia', name: 'Sardinija', type: 'island', lat: 40.1209, lng: 9.0129 },
  { id: 'corsica', name: 'Korzika', type: 'island', lat: 42.0396, lng: 9.0129 },
  { id: 'crete', name: 'Kreta', type: 'island', lat: 35.2401, lng: 24.8093 },
  { id: 'northsea', name: 'Severno morje', type: 'sea', lat: 56.0, lng: 3.0 },
  { id: 'baltic', name: 'Baltsko morje', type: 'sea', lat: 58.0, lng: 20.0 },
  { id: 'mediterranean', name: 'Sredozemsko morje', type: 'sea', lat: 37.0, lng: 18.0 },
  { id: 'blacksea', name: 'Črno morje', type: 'sea', lat: 43.5, lng: 34.0 },
  { id: 'adriatic', name: 'Jadransko morje', type: 'sea', lat: 42.8, lng: 15.8 },
  { id: 'tyrrhenian', name: 'Tirensko morje', type: 'sea', lat: 40.0, lng: 12.0 },
  { id: 'aegean', name: 'Egejsko morje', type: 'sea', lat: 38.5, lng: 25.5 },
  { id: 'gibraltar', name: 'Gibraltarski preliv', type: 'strait', lat: 36.0, lng: -5.35 },
  { id: 'bosporus', name: 'Bospor', type: 'strait', lat: 41.05, lng: 29.03 },
  { id: 'dardanelles', name: 'Dardanele', type: 'strait', lat: 40.2, lng: 26.4 },
  { id: 'channel', name: 'Rokavski preliv', type: 'strait', lat: 50.5, lng: 1.5 },
  { id: 'alps', name: 'Alpe', type: 'mountain', lat: 46.5, lng: 10.0, coords: [[44.5,6.5],[45.5,7.0],[46.5,8.0],[47.0,10.5],[47.5,13.0],[47.0,15.5],[46.5,16.0]] },
  { id: 'pyrenees', name: 'Pireneji', type: 'mountain', lat: 42.6, lng: 0.5, coords: [[42.5,-1.5],[42.6,0.0],[42.5,1.5],[42.3,2.5]] },
  { id: 'apennines', name: 'Apenini', type: 'mountain', lat: 43.0, lng: 12.5, coords: [[44.5,9.0],[43.5,12.0],[42.5,13.5],[41.5,14.5],[40.5,15.5],[39.5,16.0]] },
  { id: 'carpathians', name: 'Karpati', type: 'mountain', lat: 47.0, lng: 25.0, coords: [[48.5,17.5],[48.0,19.0],[47.5,22.0],[47.0,24.0],[46.5,25.5],[45.5,26.0],[45.0,25.0]] },
  { id: 'dinaric', name: 'Dinarsko gorstvo', type: 'mountain', lat: 44.0, lng: 17.0, coords: [[46.0,14.0],[45.0,15.0],[44.0,16.5],[43.0,18.0],[42.5,19.5]] },
  { id: 'danube', name: 'Donava', type: 'river', lat: 45.0, lng: 25.0, coords: [[48.2,8.5],[48.3,10.0],[48.0,13.0],[47.7,17.0],[47.5,19.0],[46.5,20.0],[45.5,24.0],[44.5,28.0],[45.0,29.5]] },
  { id: 'rhine', name: 'Ren', type: 'river', lat: 49.5, lng: 7.0, coords: [[51.9,5.0],[51.5,6.5],[50.5,7.0],[49.5,8.0],[48.5,8.0],[47.5,8.5]] },
  { id: 'po', name: 'Pad', type: 'river', lat: 45.0, lng: 10.0, coords: [[44.7,7.0],[45.0,8.5],[45.0,10.5],[44.9,12.0]] },
  { id: 'sava', name: 'Sava', type: 'river', lat: 45.0, lng: 17.0, coords: [[46.3,14.0],[45.8,15.5],[45.2,17.0],[44.8,19.0],[44.8,20.5]] },
];

const typeColors: Record<string, string> = {
  peninsula: '#f59e0b', island: '#0ea5e9', sea: '#3b82f6',
  strait: '#8b5cf6', mountain: '#ef4444', river: '#22c55e', country: '#6366f1',
};

const typeLabels: Record<string, string> = {
  peninsula: 'Polotok', island: 'Otok', sea: 'Morje',
  strait: 'Ožina', mountain: 'Gorovje', river: 'Reka', country: 'Država',
};

function createIcon(color: string, size: number = 10): L.DivIcon {
  return L.divIcon({
    className: '',
    html: '<div style="width:' + size + 'px;height:' + size + 'px;background:' + color + ';border:2px solid white;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.3);cursor:pointer;"></div>',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.Layer[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>(Object.keys(typeColors));
  const [gameMode, setGameMode] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<MapFeature | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const activeFeatures = features.filter(f => activeTypes.includes(f.type));

  const clearLayers = useCallback(() => {
    layersRef.current.forEach(l => { if (mapRef.current) mapRef.current.removeLayer(l); });
    layersRef.current = [];
  }, []);

  const handleRegionClick = (region: MapFeature) => {
    if (!gameMode || !currentTarget) return;
    setAttempts(a => a + 1);
    if (region.id === currentTarget.id) {
      setScore(s => s + 1);
      setFeedback('correct');
      setTimeout(() => {
        const pool = features.filter(f => activeTypes.includes(f.type));
        const next = pool[Math.floor(Math.random() * pool.length)];
        setCurrentTarget(next);
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const renderFeatures = useCallback(() => {
    if (!mapRef.current) return;
    clearLayers();
    activeFeatures.forEach(f => {
      let layer: L.Layer | null = null;
      if (f.coords && f.type === 'mountain') {
        layer = L.polyline(f.coords, { color: typeColors[f.type], weight: 3, dashArray: '6 4', opacity: 0.8 });
      } else if (f.coords && f.type === 'river') {
        layer = L.polyline(f.coords, { color: typeColors[f.type], weight: 3, opacity: 0.9 });
      } else if (f.type === 'sea') {
        layer = L.circleMarker([f.lat, f.lng], { radius: 18, color: typeColors[f.type], fillColor: typeColors[f.type], fillOpacity: 0.15, weight: 1.5, dashArray: '4 3' });
      } else if (f.type === 'peninsula') {
        layer = L.circleMarker([f.lat, f.lng], { radius: 14, color: typeColors[f.type], fillColor: typeColors[f.type], fillOpacity: 0.2, weight: 2 });
      } else if (f.type === 'strait') {
        layer = L.circleMarker([f.lat, f.lng], { radius: 8, color: typeColors[f.type], fillColor: typeColors[f.type], fillOpacity: 0.5, weight: 2, dashArray: '3 3' });
      } else {
        layer = L.marker([f.lat, f.lng], { icon: createIcon(typeColors[f.type], f.type === 'country' ? 12 : 10) });
      }
      if (layer) {
        if (!gameMode) {
          layer.bindTooltip(f.name, { direction: 'top', offset: [0, -5] });
        }
        layer.on('click', () => handleRegionClick(f));
        if (!gameMode) {
          layer.on('mouseover', () => setHoveredName(f.name));
          layer.on('mouseout', () => setHoveredName(null));
        }
        layer.addTo(mapRef.current!);
        layersRef.current.push(layer);
      }
    });
  }, [activeFeatures, clearLayers, gameMode]);

  const startGame = () => {
    const pool = features.filter(f => activeTypes.includes(f.type));
    if (pool.length === 0) return;
    const target = pool[Math.floor(Math.random() * pool.length)];
    setCurrentTarget(target);
    setGameMode(true);
    setScore(0);
    setAttempts(0);
    setFeedback(null);
  };

  const toggleType = (type: string) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { center: [48.5, 15.0], zoom: 5, zoomControl: true, attributionControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
    mapRef.current = map;
    setMapReady(true);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => { if (mapReady) renderFeatures(); }, [activeTypes, mapReady, renderFeatures]);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="card">
        <h2 className="font-display text-xl font-bold mb-1">Interaktivni zemljevid Evrope</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Pravi zemljevid (OpenStreetMap) z označenimi državami, polotoki, otoki, morji, ožinami, gorovji in rekami.
          Klikni na oznake. Uporabi filtre in igro "Najdi".
        </p>
      </div>
      <div className="card flex flex-wrap items-center gap-2">
        {Object.entries(typeLabels).map(([type, label]) => (
          <button key={type} onClick={() => toggleType(type)}
            className="text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"
            style={{ background: activeTypes.includes(type) ? typeColors[type] : 'var(--bg-secondary)', color: activeTypes.includes(type) ? '#fff' : 'var(--text-muted)', opacity: activeTypes.includes(type) ? 1 : 0.6 }}>
            <span className="w-2 h-2 rounded-full" style={{ background: activeTypes.includes(type) ? '#fff' : typeColors[type] }} />{label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {gameMode && <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}><Trophy size={14} className="inline mr-1" />{score}/{attempts}</span>}
          <button onClick={gameMode ? () => setGameMode(false) : startGame} className="btn-primary text-sm inline-flex items-center gap-1.5">
            {gameMode ? <RotateCcw size={14} /> : <MapPin size={14} />}{gameMode ? 'Končaj igro' : 'Začni "Najdi"'}
          </button>
        </div>
      </div>
      {gameMode && currentTarget && (
        <div className="card text-center" style={{ background: feedback === 'correct' ? '#22c55e15' : feedback === 'wrong' ? '#ef444415' : 'var(--bg-card)' }}>
          <p className="text-sm font-medium">
            {feedback === 'correct' ? <span className="inline-flex items-center gap-1" style={{ color: 'var(--success)' }}><Check size={16} /> Pravilno!</span>
            : feedback === 'wrong' ? <span className="inline-flex items-center gap-1" style={{ color: 'var(--danger)' }}><X size={16} /> Napačno!</span>
            : <>Klikni na: <strong style={{ color: 'var(--accent)' }}>{currentTarget.name}</strong></>}
          </p>
        </div>
      )}
      {hoveredName && !gameMode && (
        <div className="card py-2 px-3 flex items-center gap-2">
          <span className="text-sm font-medium">{hoveredName}</span>
        </div>
      )}
      <div className="card p-0 overflow-hidden" style={{ height: '500px' }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="card">
        <h3 className="font-semibold text-sm mb-2">Legenda ({activeFeatures.length} prikazanih)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
          {activeFeatures.map(f => (
            <div key={f.id} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ background: typeColors[f.type], border: '1px solid ' + typeColors[f.type] }} />
              <span className="truncate" style={{ color: 'var(--text-secondary)' }}>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
