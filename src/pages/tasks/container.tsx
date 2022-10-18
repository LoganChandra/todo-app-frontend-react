// EXTERNAL
import React, { useEffect, useState, useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';

// INTERNAL
import { SearchTaskInput, Task, UpdateTaskPayload } from '../../models/task';
import { TaskService } from '../../service/task';
import TaskLayout from './layout';

const TaskList: React.FC<{}> = () => {

    // STATES
    const [taskData, setTaskData] = useState<Task[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)

    // DEFINING TASK SERVICE FOR API CALLS
    const taskService = useMemo(() => {
        return new TaskService();
    }, []);

    // LOAD TASKS ON LOAD
    useEffect(() => {
        search({ search: "", page: 1, pageSize: 10 });
    }, [taskService]);

    // DEFINING COLUMNS FOR DATA TABLE
    const columns: GridColDef[] = ([
        { field: "name", headerName: "Name", sortable: true, width: 300 },
        { field: "description", headerName: "Description", width: 300 },
        {
            field: "dueDate",
            headerName: "Due date",
            sortable: true,
            width: 300,
            valueGetter: (param) => new Date(param.row.dueDate).toDateString()
        },
        {
            field: "createDate",
            headerName: "Create date",
            sortable: true,
            width: 300,
            valueGetter: (param) => new Date(param.row.createDate).toDateString(),
        },
        { field: "status", headerName: "Status", width: 100 }
    ]);

    // FUNCTION TO SEARCH TASKS
    const search = async (payload: SearchTaskInput) => {
        try {
            let res = await taskService.listTask(payload)
            setTaskData(res.tasks.map((e, idx) => { return { ...e, id: idx } }));
            setTotalCount(res.totalCount);

        } catch (error) {
            console.error(error);
        }
    }

    // FUNCTION TO UPDATE TASKS
    const updateTask = async (body: UpdateTaskPayload) => {
        try {
            let { name, description, dueDate } = body
            await taskService.updateTask(body.taskId, { name, description, dueDate })
            search({ search: "", page: 1, pageSize: 10 })

        } catch (error) {
            console.error(error);
        }
    }

    // FUNCTION TO ADD TASK
    const addTask = async (body: UpdateTaskPayload) => {
        try {
            let { name, description, dueDate } = body
            await taskService.addTask({ name, description, dueDate })
            search({ search: "", page: 1, pageSize: 10 })

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="mt-10 mx-10">
            <TaskLayout
                addTask={addTask}
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