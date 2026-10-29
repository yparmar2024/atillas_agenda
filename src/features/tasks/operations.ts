import { appConfig } from '../../config';
import type { Status, Task } from './model';

export function createTask(input: Omit<Task, 'rewarded'>): Task | undefined {
  if (!input.title.trim()) return;
  return {
    ...input,
    title: input.title.trim(),
    notes: input.notes?.trim(),
    rewarded: input.status === 'done',
  };
}

export function saveTask(tasks: Task[], task: Task): Task[] {
  return tasks.some((current) => current.id === task.id)
    ? tasks.map((current) => (current.id === task.id ? task : current))
    : [...tasks, task];
}

export function moveTask(tasks: Task[], id: string, status: Status) {
  const task = tasks.find((current) => current.id === id);
  const points =
    task && status === 'done' && !task.rewarded ? appConfig.rewards.task : 0;
  return {
    tasks: tasks.map((current) =>
      current.id === id
        ? {
            ...current,
            status,
            rewarded: current.rewarded || status === 'done',
          }
        : current,
    ),
    points,
  };
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}
