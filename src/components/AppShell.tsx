import type { ReactNode } from 'react';
import { LayoutDashboard, Timer, Sparkles } from 'lucide-react';
import '../styles/shell.css';
export type View = 'workspace' | 'focus';
type Props = {
  view: View;
  onNavigate: (view: View) => void;
  running: boolean;
  points: number;
  children: ReactNode;
};
export function AppShell({
  view,
  onNavigate,
  running,
  points,
  children,
}: Props) {
  return (
    <div className="app">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('workspace');
          }}
        >
          <span className="brand-mark">a.</span>
          <span>
            attila’s
            <br />
            <b>agenda</b>
          </span>
        </a>
        <nav>
          <button
            className={view === 'workspace' ? 'active' : ''}
            onClick={() => onNavigate('workspace')}
          >
            <LayoutDashboard size={19} /> Workspace
          </button>
          <button
            className={view === 'focus' ? 'active' : ''}
            onClick={() => onNavigate('focus')}
          >
            <Timer size={19} /> Focus room{' '}
            {running && <span className="live-dot" />}
          </button>
        </nav>
      </aside>
      <main>
        <header>
          <div className="breadcrumb">
            Your space <span>/</span>{' '}
            {view === 'workspace' ? 'Workspace' : 'Focus room'}
          </div>
          <div className="points">
            <Sparkles size={16} />
            <strong>{points}</strong> points
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
