import axios from "axios"
import { Task } from "../models/task";

export class TaskService {
    private API_URL: string;

    constructor() {
        this.API_URL = "https://todo-or-not-todo-app-backend.herokuapp.com" || ""
    }
    async listTask(queryStringParameters: Object): Promise<{tasks: Task[], totalCount: number}> {
        let result = await axios
            .get(`${this.API_URL}/task`, { params: queryStringParameters })
            .catch((err) => err);
        if (result && result.status != 200) {
            return result.data.data || {};
        }

        return result.data.data || [];
    }
    async addTask(body: Object): Promise<null> {
        let result = await axios
            .post(`${this.API_URL}/task`, body)
            .catch((err) => err);
        if (result && result.status != 200) {
            return result.data.data || {};
        }

        return result.data || [];
    }
    async updateTask(taskId: String, body: Object): Promise<null> {
        let result = await axios
            .patch(`${this.API_URL}/task/${taskId}`, body)
            .catch((err) => err);
        if (result && result.status != 200) {
            return result.data.data || {};
        }

        return result.data;
    }
}
