export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
} 

export interface TaskResponse {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    userId: number;
    userName: string;
}

export interface TaskRequest {
  title: string;
  description: string;
  status?: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  userId: number;
}