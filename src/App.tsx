import { useCallback, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AppShell, type View } from './components/AppShell';
import { Workspace } from './pages/Workspace';
import { FocusRoom } from './pages/FocusRoom';
import { Dialog } from './components/Dialog';
import { TaskDialog } from './features/tasks/TaskDialog';
import type { Task, Status } from './features/tasks/model';
import { useTimer } from './hooks/useTimer';
import { appConfig, sessionReward } from './config';
export function App() {
  const [view, setView] = useState<View>('workspace');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deletingTask, setDeletingTask] = useState<Task>();
  const [modal, setModal] = useState(false);
  const [night, setNight] = useState(false);
  const [notice, setNotice] = useState('');
  const reward = useCallback((amount: number) => {
    setPoints((points) => points + amount);
    setCelebrate(true);
  }, []);
  const completeSession = useCallback(
    (seconds: number) => {
      const earned = sessionReward(seconds);
      reward(earned);
      setNotice(
        `Session complete. Take a breath — you earned ${earned} points.`,
      );
    },
    [reward],
  );
  const timer = useTimer(completeSession);
  const closeDialog = useCallback(() => setModal(false), []);
  useEffect(() => {
    if (!celebrate) return;
    const timeout = setTimeout(() => setCelebrate(false), 3600);
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
              setDeletingTask(tasks.find((task) => task.id === id))
            }
            onAdd={() => {
              setEditingTask(undefined);
              setModal(true);
            }}
            onEdit={(task) => {
              setEditingTask(task);
              setModal(true);
            }}
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
          task={editingTask}
          onCreate={(task) => {
            setTasks((tasks) =>
              editingTask
                ? tasks.map((current) =>
                    current.id === task.id ? task : current,
                  )
                : [...tasks, { ...task, rewarded: task.status === 'done' }],
            );
            if (!editingTask && task.status === 'done')
              reward(appConfig.rewards.task);
          }}
          onClose={closeDialog}
        />
      )}
      {deletingTask && (
        <Dialog
          titleId="delete-title"
          onClose={() => setDeletingTask(undefined)}
        >
          <h2 id="delete-title">Delete task?</h2>
          <p className="delete-message">
            “{deletingTask.title}” and its notes will be removed. This cannot be
            undone.
          </p>
          <div className="dialog-actions">
            <button
              autoFocus
              className="secondary"
              onClick={() => setDeletingTask(undefined)}
            >
              Keep task
            </button>
            <button
              className="primary danger"
              onClick={() => {
                setTasks((tasks) =>
                  tasks.filter((task) => task.id !== deletingTask.id),
                );
                setDeletingTask(undefined);
              }}
            >
              Delete task
            </button>
          </div>
        </Dialog>
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
