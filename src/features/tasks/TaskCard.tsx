import { Check, Sparkles, X } from 'lucide-react';
import { appConfig } from '../../config';
import type { Task, Status } from './model';
import '../../styles/tasks.css';
type Props = {
  task: Task;
  onMove: (task: Task, status: Status) => void;
  onDelete: (id: string) => void;
};
export function TaskCard({ task, onMove, onDelete }: Props) {
  return (
    <article
      className="task"

      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
    >
      <div className={`subject subject-${task.subject.toLowerCase()}`}>
        {task.subject}
      </div>
      <h4>{task.title}</h4>
      <div className="task-footer">
        <span>
          {task.rewarded ? (
            <>
              <Check size={13} /> Earned {appConfig.rewards.task} pts
            </>
          ) : (
            <>
              <Sparkles size={13} /> {appConfig.rewards.task} pts
            </>
          )}
        </span>
        <select
          aria-label={`Move ${task.title}`}
          value={task.status}
          onChange={(e) => onMove(task, e.target.value as Status)}
        >
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>
        <button
          className="delete-task"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDelete(task.id)}
        >
          <X size={13} />
        </button>
      </div>
    </article>
  );
}
