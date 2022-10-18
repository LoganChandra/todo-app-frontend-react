// EXTERNAL
import axios from "axios"

// INTERNAL
import { SearchTaskInput, Task, UpdateTaskPayload } from "../models/task";

export class TaskService {
    private API_URL: string;

    // DEFNING API URL
    constructor() {
        this.API_URL = "https://todo-or-not-todo-app-backend.herokuapp.com" || ""
    }

    // LIST TASK 
    async listTask(queryStringParameters: SearchTaskInput): Promise<{ tasks: Task[], totalCount: number }> {
        let result = await axios
            .get(`${this.API_URL}/task`, { params: queryStringParameters })
        if (result && result.status !== 200) {
            return result.data.data || {};
        }
        return result.data.data || [];
    }

    // ADD TASK
    async addTask(body: UpdateTaskPayload): Promise<null> {
        let result = await axios
            .post(`${this.API_URL}/task`, body)
        if (result && result.status !== 200) {
            return result.data.data || {};
        }
        return result.data || [];
    }

    // UPDATE TASK
    async updateTask(taskId: string | undefined, body: UpdateTaskPayload): Promise<null> {
        let result = await axios
            .patch(`${this.API_URL}/task/${taskId}`, body)
        if (result && result.status !== 200) {
            return result.data.data || {};
        }
        return result.data;
    }
}
