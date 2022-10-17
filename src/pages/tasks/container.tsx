import React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react'
import { Task, UpdateTaskPayload } from '../../models/task';
import { TaskService } from '../../service/task';
import TaskLayout from './layout';
import { GridColDef } from '@mui/x-data-grid';

const TaskList: React.FC<{}> = () => {
    const [taskData, setTaskData] = useState<Task[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)

    const columns: GridColDef[] = ([
        { field: "name", headerName: "Name", sortable: true, width: 200 },
        { field: "description", headerName: "Description", width: 200 },
        { field: "dueDate", headerName: "Due date", sortable: true, width: 200 },
        { field: "createDate", headerName: "Create date", sortable: true, width: 200 },
        { field: "status", headerName: "Status", width: 200 }
    ]);

    const taskService = useMemo(() => {
        return new TaskService();
    }, []);

    useEffect(() => {
        search("", 1, 10);
    }, [taskService]);

    const search = useCallback(async (search: string, page: number, pageSize: number) => {
        try {
            console.log("search: string, page: number, pageSize: number", search, page, pageSize);
            
            let res = await taskService.listTask({ search, page, pageSize })
            setTaskData(res.tasks.map((e, idx) => { return { ...e, id: idx } }));
            setTotalCount(res.totalCount);

        } catch (error) {
            console.error(error);
        }
    }, [taskService])

    const updateTask = async (body: UpdateTaskPayload) => {
        try {
            let { name, description, dueDate } = body
            await taskService.updateTask(body.taskId, { name, description, dueDate })
            search("", 1, 10);

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="mt-10 mx-10">
            <TaskLayout
                searchTasks={search}
                updateTask={updateTask}
                taskData={taskData}
                totalCount={totalCount}
                columns={columns}
            />
        </div >

    );
}
export default TaskList;