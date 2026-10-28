import { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { appConfig } from '../../config';
import { Dialog } from '../../components/Dialog';
import type { Task, Status } from './model';
type Props = {
  onCreate: (task: Task) => void;
  onClose: () => void;
  task?: Task;
};
export function TaskDialog({ onCreate, onClose, task }: Props) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [subject, setSubject] = useState(
    task?.subject ?? appConfig.taskCategories[0],
  );
  const [notes, setNotes] = useState(task?.notes ?? '');
  const [status, setStatus] = useState<Status>(task?.status ?? 'todo');
  return (
    <Dialog titleId="task-title" onClose={onClose}>
      <button
        type="button"
        className="close"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <h2 id="task-title">{task ? 'Edit task' : 'New task'}</h2>
      <p className="dialog-intro">
        {task
          ? 'Keep the details you need close at hand.'
          : 'Give your task a name. The rest is up to you.'}
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          onCreate({
            id: task?.id ?? crypto.randomUUID(),
            title: title.trim(),
            subject,
            notes: notes.trim(),
            status,
            rewarded: task?.rewarded ?? false,
          });
          onClose();
        }}
      >
        <label>
          Task name <span className="field-hint">Required</span>
          <input
            autoFocus
            required
            maxLength={120}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What do you need to do?"
          />
        </label>
        <div className="form-row">
          <label>
            Category
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              {appConfig.taskCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          {!task && (
            <label>
              Add to
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
              >
                <option value="todo">To do</option>
                <option value="doing">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>
          )}
        </div>
        <label>
          Notes <span className="field-hint">Optional</span>
          <textarea
            rows={4}
            maxLength={2000}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Details, links, or things to remember…"
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="primary" type="submit">
            {task ? <Check size={17} /> : <Plus size={17} />}
            {task ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
