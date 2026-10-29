import { Plus, BookOpen } from 'lucide-react';
import { Mascot } from '../components/Mascot';
import { TaskBoard } from '../features/tasks/TaskBoard';
import type { Task, Status } from '../features/tasks/model';
import '../styles/workspace.css';
type Props = {
  tasks: Task[];
  celebrate: boolean;
  onMove: (task: Task, status: Status) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onEdit: (task: Task) => void;
};
export function Workspace({
  tasks,
  celebrate,
  onMove,
  onDelete,
  onAdd,
  onEdit,
}: Props) {
  const completed = tasks.filter((task) => task.status === 'done').length;
  return (
    <div className="page">
      <div className="board-heading">
        <div>
          <h1>
            Workspace
            <span>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </h1>
          <p>Plan your work. Move tasks as you go.</p>
        </div>
        <button className="primary" onClick={() => onAdd()}>
          <Plus size={17} /> New task
        </button>
      </div>
      <TaskBoard
        tasks={tasks}
        onMove={onMove}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <footer>
        <span>
          <BookOpen size={15} />{' '}
          {completed
            ? `${completed} ${completed === 1 ? 'task' : 'tasks'} completed`
            : 'No completed tasks yet'}
        </span>
      </footer>
      <section className="study-desk" aria-label="Attila at the study desk">
        <div>
          <span className="desk-title">Study company.</span>
          <p>Attila’s here while you work.</p>
        </div>
        <div className="desk-line" />
        <Mascot state={celebrate ? 'celebrating' : 'studying'} />
      </section>
    </div>
  );
}
