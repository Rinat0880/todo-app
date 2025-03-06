export interface Task {
    id: number;
    title: string;
    description: string | null;
    due_date: string | null;
    status: boolean;
    created_at: string;
  }
  
  export interface TaskCreate {
    title: string;
    description: string | null;
    due_date: string | null;
    status: boolean;
  }