export interface Task {
    id: number;
    title: string;
    description?: string;
    due_date?: string;
    status: boolean;
    created_at: string;
  }
  
  export interface TaskCreate {
    title: string;
    description?: string;
    due_date?: string;
    status: boolean;
  }