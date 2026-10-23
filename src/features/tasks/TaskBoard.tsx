import { Plus } from 'lucide-react';
import type { Task, Status } from './model';
import { TaskCard } from './TaskCard';
type Props = {
  tasks: Task[];
  onMove: (task: Task, status: Status) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};
export function TaskBoard({ tasks, onMove, onDelete, onAdd }: Props) {
  return (
    <section className="board" aria-label="Task board">
      {(['todo', 'doing', 'done'] as Status[]).map((status, i) => (
        <div
          className={`column column-${status}`}
          key={status}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const t = tasks.find(
              (t) => t.id === e.dataTransfer.getData('text/plain'),
            );
            if (t) onMove(t, status);
          }}
        >
          <div className="column-heading">
            <span className="status-dot" />
            <h3>{['To do', 'In progress', 'Done'][i]}</h3>
            <span className="count">
              {tasks.filter((t) => t.status === status).length}
            </span>
            <button
              aria-label={`Add task to ${status}`}
              onClick={() => {
                onAdd();
              }}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="task-list">
            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMove={onMove}
                  onDelete={onDelete}
                />
              ))}
            {!tasks.some((t) => t.status === status) && (
              <div className="empty-column">
                {status === 'done'
                  ? 'Completed tasks appear here.'
                  : status === 'doing'
                    ? 'Move a task here when you start working.'
                    : 'Add your first task to get started.'}
              </div>
            )}
          </div>
          <button className="add-task" onClick={() => onAdd()}>
            <Plus size={14} /> Add a task
          </button>
        </div>
      ))}
    </section>
  );
}
