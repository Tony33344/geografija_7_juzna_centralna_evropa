import { BookOpen, HelpCircle, Layers, MessageSquare, Map, TrendingUp, ArrowRight } from 'lucide-react';
import type { View } from '../App';
import type { ProgressState } from '../hooks/useProgress';
import { chapters } from '../data/textbookContent';
import { quizQuestions } from '../data/quizData';
import { oralExamQuestions } from '../data/oralExamData';
import { flashcards } from '../data/flashcardData';

interface Props {
  progress: {
    progress: ProgressState;
    getOverallProgress: (n: number) => { chapterPct: number; quizAvg: number; oralPct: number; overall: number };
  };
  onNavigate: (v: View) => void;
}

export default function Dashboard({ progress, onNavigate }: Props) {
  const stats = progress.getOverallProgress(chapters.length);

  const recentQuiz = Object.entries(progress.progress.quizResults).slice(-3);
  const masteredCards = Object.values(progress.progress.cardProgress).filter(c => c.box >= 4).length;
  const oralKnown = Object.values(progress.progress.oralExamProgress).filter(o => o.status === 'known').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="card">
        <h2 className="font-display text-2xl font-bold mb-2">Pozdravljen, učenec 7. razreda!</h2>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Pripravi se na spraševanje iz geografije — Južna, Jugovzhodna in Srednja Evropa.
          Tvoj napredek se samodejno shranjuje.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Predelano snovi" value={`${stats.chapterPct}%`} color="#0ea5e9" />
        <StatCard icon={HelpCircle} label="Povprečje kvizov" value={`${stats.quizAvg}%`} color="#22c55e" />
        <StatCard icon={MessageSquare} label="Ustna vprašanja" value={`${oralKnown}/${oralExamQuestions.length}`} color="#f59e0b" />
        <StatCard icon={Layers} label="Osvojene kartice" value={`${masteredCards}/${flashcards.length}`} color="#8b5cf6" />
      </div>

      {/* Overall progress bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
            <span className="font-semibold">Skupni napredek</span>
          </div>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>{stats.overall}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${stats.overall}%`, background: 'var(--accent)' }}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ActionCard
          title="Učbenik"
          desc={`${chapters.length} poglavij s celotno snovjo`}
          icon={BookOpen}
          onClick={() => onNavigate('textbook')}
        />
        <ActionCard
          title="Kvizi"
          desc={`${quizQuestions.length} vprašanj za utrjevanje`}
          icon={HelpCircle}
          onClick={() => onNavigate('quiz')}
        />
        <ActionCard
          title="Ustno spraševanje"
          desc={`${oralExamQuestions.length} vprašanj z model odgovori`}
          icon={MessageSquare}
          onClick={() => onNavigate('oral')}
        />
        <ActionCard
          title="Kartice"
          desc={`${flashcards.length} kartic za pomnjenje`}
          icon={Layers}
          onClick={() => onNavigate('flashcards')}
        />
        <ActionCard
          title="Zemljevid"
          desc="Interaktivni zemljevid Evrope"
          icon={Map}
          onClick={() => onNavigate('map')}
        />
        <ActionCard
          title="Listek za na pamet"
          desc="Hitri pregled vseh pojmov"
          icon={TrendingUp}
          onClick={() => onNavigate('cheatsheet')}
        />
      </div>

      {/* Recent activity */}
      {recentQuiz.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-3">Nedavni rezultati kvizov</h3>
          <div className="space-y-2">
            {recentQuiz.map(([cat, res]) => (
              <div key={cat} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm">{cat}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--success)' }}>
                  {res.score}/{res.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="card text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" style={{ background: `${color}20` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div className="text-xl font-bold font-display">{value}</div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

function ActionCard({ title, desc, icon: Icon, onClick }: { title: string; desc: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card text-left group hover:opacity-90 transition-all w-full"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
            <Icon size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>
          </div>
        </div>
        <ArrowRight size={16} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
      </div>
    </button>
  );
}
