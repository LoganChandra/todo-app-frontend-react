export interface Task {
    taskId: string;
    name: string;
    description: string;
    dueDate: number;
    createDate: Number;
    status: string;
}

export interface UpdateTaskPayload {
    taskId: string;
    name: string;
    description: string;
    dueDate: Date;
}