// EXTERNAL
import React, { useEffect, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';

// INTERNAL
import { SearchTaskInput, Task, UpdateTaskPayload } from '../../models/task';
import { TaskService } from '../../service/task';
import TaskLayout from './layout';


const TaskList: React.FC<{}> = () => {

    // REFS
    const search = useRef((payload: SearchTaskInput) => { })

    // STATES
    const [taskData, setTaskData] = useState<Task[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)

    // DEFINING TASK SERVICE FOR API CALLS
    const taskService = new TaskService();

    // LOAD TASKS ON LOAD
    useEffect(() => {
        search.current({ search: "", page: 1, pageSize: 10 });
    }, []);

    // DEFINING COLUMNS FOR DATA TABLE
    const columns: GridColDef[] = ([
        {
            field: "name",
            headerName: "Name",
            sortable: true,
            flex: 1,
            valueGetter: (param) => param.row.name || "-"
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            valueGetter: (param) => param.row.description || "-"
        },
        {
            field: "dueDate",
            headerName: "Due date",
            sortable: true,
            flex: 1,
            valueGetter: (param) => new Date(param.row.dueDate).toDateString()
        },
        {
            field: "createDate",
            headerName: "Create date",
            sortable: true,
            flex: 1,
            valueGetter: (param) => new Date(param.row.createDate).toDateString(),
        },
        {
            field: "status",
            headerName: "Status",
            width: 100
        }
    ]);

    // FUNCTION TO SEARCH TASKS
    search.current = async (payload: SearchTaskInput) => {
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
            search.current({ search: "", page: 1, pageSize: 10 })

        } catch (error) {
            console.error(error);
        }
    }

    // FUNCTION TO ADD TASK
    const addTask = async (body: UpdateTaskPayload) => {
        try {
            let { name, description, dueDate } = body
            await taskService.addTask({ name, description, dueDate })
            search.current({ search: "", page: 1, pageSize: 10 })

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="mt-10 mx-10">
            <TaskLayout
                addTask={addTask}
                searchTasks={search.current}
                updateTask={updateTask}
                taskData={taskData}
                totalCount={totalCount}
                columns={columns}
            />
        </div >

    );
}
export default TaskList;