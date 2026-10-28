export type Status = 'todo' | 'doing' | 'done';
export type Task = {
  id: string;
  title: string;
  notes?: string;
  subject: string;
  status: Status;
  rewarded: boolean;
};
