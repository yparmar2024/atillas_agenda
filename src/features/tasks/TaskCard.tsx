import { Check, Pencil, Sparkles, X } from 'lucide-react';
import { appConfig } from '../../config';
import type { Task } from './model';
import '../../styles/tasks.css';
type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};
export function TaskCard({ task, onEdit, onDelete }: Props) {
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
      {task.notes && <p className="task-notes">{task.notes}</p>}
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
        <button
          className="edit-task"
          aria-label={`Edit ${task.title}`}
          onClick={() => onEdit(task)}
        >
          <Pencil size={15} />
        </button>
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
