import { useCallback, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AppShell, type View } from './components/AppShell';
import { Workspace } from './pages/Workspace';
import { FocusRoom } from './pages/FocusRoom';
import { TaskDialog } from './features/tasks/TaskDialog';
import type { Task, Status } from './features/tasks/model';
import { useTimer } from './hooks/useTimer';
import { appConfig } from './config';
export function App() {
  const [view, setView] = useState<View>('workspace');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [modal, setModal] = useState(false);
  const [night, setNight] = useState(false);
  const [notice, setNotice] = useState('');
  const reward = useCallback((amount: number) => {
    setPoints((points) => points + amount);
    setCelebrate(true);
  }, []);
  const completeSession = useCallback(() => {
    reward(appConfig.rewards.session);
    setNotice(
      `Session complete. Take a breath — you earned ${appConfig.rewards.session} points.`,
    );
  }, [reward]);
  const timer = useTimer(completeSession);
  const closeDialog = useCallback(() => setModal(false), []);
  useEffect(() => {
    if (!celebrate) return;
    const timeout = setTimeout(() => setCelebrate(false), 2500);
    return () => clearTimeout(timeout);
  }, [celebrate]);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(timeout);
  }, [notice]);
  const moveTask = (task: Task, status: Status) => {
    setTasks((tasks) =>
      tasks.map((current) =>
        current.id === task.id
          ? {
              ...current,
              status,
              rewarded: current.rewarded || status === 'done',
            }
          : current,
      ),
    );
    if (status === 'done' && !task.rewarded) reward(appConfig.rewards.task);
  };
  return (
    <>
      <AppShell
        view={view}
        onNavigate={setView}
        running={timer.running}
        points={points}
      >
        {view === 'workspace' ? (
          <Workspace
            tasks={tasks}
            celebrate={celebrate}
            onMove={moveTask}
            onDelete={(id) =>
              setTasks((tasks) => tasks.filter((task) => task.id !== id))
            }
            onAdd={() => setModal(true)}
          />
        ) : (
          <FocusRoom
            timer={timer}
            night={night}
            onToggleNight={() => setNight((night) => !night)}
            celebrate={celebrate}
          />
        )}
      </AppShell>
      {modal && (
        <TaskDialog
          onCreate={(task) => setTasks((tasks) => [...tasks, task])}
          onClose={closeDialog}
        />
      )}
      {notice && (
        <div className="toast" role="status">
          <Sparkles size={18} />
          {notice}
        </div>
      )}
    </>
  );
}
