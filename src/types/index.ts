export interface Task {
  id: string;
  strategy: string;
  task: string;
  owner: string;
  start: string;
  due: string;
  status: 'Not Started' | 'In Progress' | 'Blocked' | 'Done';
  progress: number;
  kpi: string;
  target: string;
  notes: string;
}

export interface KeyResult {
  kr: string;
  baseline: number;
  target: number;
  current: number;
}

export interface Objective {
  id: string;
  objective: string;
  owner: string;
  cycle: string;
  keyResults: KeyResult[];
}

export interface AppData {
  cycle: string;
  tasks: Task[];
  okrs: Objective[];
}

export interface Metrics {
  total: number;
  done: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
  avgProgress: number;
  overdue: number;
  next7: number;
}