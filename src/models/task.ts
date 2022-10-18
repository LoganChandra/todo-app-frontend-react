export interface Task {
    taskId: string;
    name: string;
    description: string;
    dueDate: number;
    createDate: number;
    status: string;
}

export interface UpdateTaskPayload {
    taskId?: string;
    name: string;
    description: string;
    dueDate: Date;
}

export interface SearchTaskInput {
    search: string;
    page: number;
    pageSize: number;
}