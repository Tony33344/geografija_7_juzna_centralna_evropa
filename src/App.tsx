import { useState, useEffect } from 'react';
import {
  BookOpen, Map, HelpCircle, Layers, MessageSquare, Gamepad2,
  Search, Sun, Moon, ChevronRight, GraduationCap, Home,
  BarChart3, FileText, Menu, X
} from 'lucide-react';
import { useProgress } from './hooks/useProgress';
import Dashboard from './components/Dashboard';
import Textbook from './components/Textbook';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import OralExam from './components/OralExam';
import MapView from './components/MapView';
import Games from './components/Games';
import SearchView from './components/SearchView';
import CheatSheet from './components/CheatSheet';

export type View = 'dashboard' | 'textbook' | 'quiz' | 'flashcards' | 'oral' | 'map' | 'games' | 'search' | 'cheatsheet';

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Domov', icon: Home },
  { id: 'textbook', label: 'Učbenik', icon: BookOpen },
  { id: 'map', label: 'Zemljevid', icon: Map },
  { id: 'quiz', label: 'Kvizi', icon: HelpCircle },
  { id: 'flashcards', label: 'Kartice', icon: Layers },
  { id: 'oral', label: 'Ustno spraševanje', icon: MessageSquare },
  { id: 'games', label: 'Igre', icon: Gamepad2 },
  { id: 'search', label: 'Iskanje', icon: Search },
  { id: 'cheatsheet', label: 'Listek', icon: FileText },
];

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const progress = useProgress();

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  useEffect(() => {
    progress.setLastVisited(view);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard progress={progress} onNavigate={setView} />;
      case 'textbook': return <Textbook progress={progress} />;
      case 'quiz': return <Quiz progress={progress} />;
      case 'flashcards': return <Flashcards progress={progress} />;
      case 'oral': return <OralExam progress={progress} />;
      case 'map': return <MapView />;
      case 'games': return <Games />;
      case 'search': return <SearchView />;
      case 'cheatsheet': return <CheatSheet />;
      default: return <Dashboard progress={progress} onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out border-r lg:static lg:translate-x-0`}
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2 font-display font-bold text-lg" style={{ color: 'var(--accent)' }}>
            <GraduationCap size={22} />
            <span>Geografija 7</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded" style={{ color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>
        <nav className="p-2 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 56px)' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'text-white' : ''}`}
                style={active ? { background: 'var(--accent)' } : { color: 'var(--text-secondary)' }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-4 border-b sticky top-0 z-30" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 rounded" style={{ color: 'var(--text-secondary)' }}>
              <Menu size={20} />
            </button>
            <h1 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
              {navItems.find(n => n.id === view)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
              title={dark ? 'Svetli način' : 'Temni način'}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              <BarChart3 size={14} />
              <span>{progress.getOverallProgress(6).overall}%</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
