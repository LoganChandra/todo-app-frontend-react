// EXTERNAL
import axios from "axios"

// INTERNAL
import { SearchTaskInput, Task, UpdateTaskPayload } from "../models/task";

export class TaskService {
    private API_URL: string;

    // DEFNING API URL
    constructor() {
        this.API_URL = process.env.REACT_APP_API_KEY || ""
    }

    // LIST TASK 
    async listTask(queryStringParameters: SearchTaskInput): Promise<{ tasks: Task[], totalCount: number }> {
        try {
            let result = await axios
                .get(`${this.API_URL}/task`, { params: queryStringParameters })
            return result.data.data || [];

        } catch (error) {
            throw new Error(`List task failed => ${JSON.stringify(error)}`)
        }
    }

    // ADD TASK
    async addTask(body: UpdateTaskPayload) {
        try {
            await axios
                .post(`${this.API_URL}/task`, body)
        } catch (error) {
            throw new Error(`Add task failed => ${JSON.stringify(error)}`)
        }
    }

    // UPDATE TASK
    async updateTask(taskId: string | undefined, body: UpdateTaskPayload) {
        try {
            await axios
                .patch(`${this.API_URL}/task/${taskId}`, body)
        } catch (error) {
            throw new Error(`Update task failed => ${JSON.stringify(error)}`)
        }
    }
}
