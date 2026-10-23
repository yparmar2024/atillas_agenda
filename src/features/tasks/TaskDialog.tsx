import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { appConfig } from '../../config';
import type { Task } from './model';
import '../../styles/dialog.css';
type Props = { onCreate: (task: Task) => void; onClose: () => void };
export function TaskDialog({ onCreate, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<string>(appConfig.taskCategories[0]);
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={() => onClose()}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onCreate({
            id: crypto.randomUUID(),
            title: title.trim(),
            subject,
            status: 'todo',
            rewarded: false,
          });
          setTitle('');
          onClose();
        }}
      >
        <button
          type="button"
          className="close"
          aria-label="Close dialog"
          onClick={() => onClose()}
        >
          <X size={20} />
        </button>
        <div role="dialog" aria-modal="true" aria-labelledby="task-title">
          <h2 id="task-title">New task</h2>
          <label>
            Task
            <input
              autoFocus
              required
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
            />
          </label>
          <label>
            Category
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {appConfig.taskCategories.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button className="primary" type="submit">
            <Plus size={17} /> Add task
          </button>
        </div>
      </form>
    </div>
  );
}
