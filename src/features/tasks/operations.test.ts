import { describe, expect, it } from 'vitest';
import { createTask, deleteTask, moveTask, saveTask } from './operations';
import type { Task } from './model';

const task: Task = {
  id: 'task-1',
  title: 'Read chapter 1',
  notes: 'Take notes',
  subject: 'School',
  status: 'todo',
  rewarded: false,
};

describe('task operations', () => {
  it('creates and saves a task with trimmed text and its chosen category and column', () => {
    const created = createTask({
      id: 'new-task',
      title: '  Study algebra  ',
      notes: '  Chapter 2  ',
      subject: 'School',
      status: 'doing',
    });
    expect(created).toEqual({
      id: 'new-task',
      title: 'Study algebra',
      notes: 'Chapter 2',
      subject: 'School',
      status: 'doing',
      rewarded: false,
    });
    expect(saveTask([], created!)).toEqual([created]);
  });

  it.each(['', '   ', '\n\t'])('rejects blank task names (%j)', (title) => {
    expect(createTask({ ...task, title })).toBeUndefined();
  });

  it('allows a task without notes', () => {
    expect(createTask({ ...task, notes: undefined })).toMatchObject({
      title: task.title,
      notes: undefined,
    });
  });

  it('edits the matching task without duplicating it or changing other tasks', () => {
    const other = { ...task, id: 'task-2' };
    const tasks = [task, other];
    const edited = {
      ...task,
      title: 'Revised chapter',
      notes: 'Updated notes',
    };
    expect(saveTask(tasks, edited)).toEqual([edited, other]);
    expect(tasks).toEqual([task, other]);
  });

  it('moves a task to in progress without awarding points', () => {
    const result = moveTask([task], task.id, 'doing');
    expect(result).toEqual({
      tasks: [{ ...task, status: 'doing' }],
      points: 0,
    });
    expect(task.status).toBe('todo');
  });

  it('awards 10 points only on the first move to Done', () => {
    const first = moveTask([task], task.id, 'done');
    expect(first.points).toBe(10);
    expect(first.tasks[0]).toMatchObject({ status: 'done', rewarded: true });
    expect(moveTask(first.tasks, task.id, 'done').points).toBe(0);
    const reopened = moveTask(first.tasks, task.id, 'todo');
    expect(moveTask(reopened.tasks, task.id, 'done').points).toBe(0);
  });

  it('marks tasks created in Done as rewarded so they cannot earn again', () => {
    const created = createTask({ ...task, status: 'done' })!;
    expect(created.rewarded).toBe(true);
    const reopened = moveTask([created], created.id, 'doing');
    expect(moveTask(reopened.tasks, created.id, 'done').points).toBe(0);
  });

  it('ignores a move for an unknown task without awarding points', () => {
    expect(moveTask([task], 'missing', 'done')).toEqual({
      tasks: [task],
      points: 0,
    });
  });

  it('deletes only the selected task and leaves the original list intact', () => {
    const other = { ...task, id: 'task-2' };
    const tasks = [task, other];
    expect(deleteTask(tasks, task.id)).toEqual([other]);
    expect(deleteTask(tasks, 'missing')).toEqual(tasks);
    expect(tasks).toHaveLength(2);
  });
});
