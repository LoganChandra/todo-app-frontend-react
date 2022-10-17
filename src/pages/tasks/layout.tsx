import { useState } from "react";
import { Task } from "../../models/task";
import { DataGrid, GridColDef, GridEventListener, GridRowParams } from '@mui/x-data-grid';
import { Button, Pagination, TextField } from "@mui/material";
import { UpdateTaskPayload } from "../../models/task";
import Modal from "../../components/Modal"

interface TaskLayoutProps {
    taskData: Task[],
    totalCount: number,
    searchTasks: (search: string, page: number, pageSize: number) => void;
    columns: GridColDef[]
    updateTask: (event: UpdateTaskPayload) => void
}

const TaskLayout: React.FC<TaskLayoutProps> = ({
    taskData,
    totalCount,
    searchTasks,
    columns,
    updateTask
}) => {
    // TABLE
    const [searchInput, setSearchInput] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    // MODAL
    const [open, setOpen] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());

    const showModal = (event: GridRowParams) => {
        console.log("event.row", event.row);
        setName(event.row.name)
        setDescription(event.row.description)
        setDueDate(event.row.dueDate)
        setTaskId(event.row.taskId)
        setOpen(true)
    }
    const pageCount = () => {
        // CALCULATE PAGES
        return (pageSize &&
            pageSize !== 0
            ? Math.ceil(
                totalCount / pageSize
            )
            : totalCount);
    }
    return (
        <div className="flex flex-col w-full">
            <p className="text-4xl font-semibold mb-4">TODO or NOT TODO</p>
            {/* FILTER BAR */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-x-5">
                    <TextField label="Items per page" variant="standard"
                        value={pageSize}
                        onChange={(event) => setPageSize(parseInt(event.target.value) || 0)} />
                    <TextField label="Search" variant="standard" onChange={(event) => {
                        setSearchInput(event.target.value)
                        if (event.target.value.length < 1) {
                            searchTasks("", page, pageSize)
                        }
                    }
                    }
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                searchTasks(searchInput, page, pageSize);
                            }
                        }}
                    />

                </div>
                <div className="flex flex-row gap-x-5 h-8 mt-2">
                    <Button
                        onClick={() => searchTasks(searchInput, page, pageSize)}
                        variant="contained"
                    >
                        SEARCH
                    </Button>
                    <Button
                        onClick={(event) => setOpen(true)}
                        variant="contained"
                    >
                        ADD
                    </Button>
                </div>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                {/* DATA TABLE */}

                <DataGrid
                    rows={taskData}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[page]}
                    onRowClick={(event) => showModal(event)}
                    disableSelectionOnClick
                    hideFooterPagination={true}
                    hideFooter={true}
                />

                {/* PAGINATION */}
                <div className="flex justify-items-center">
                    <Pagination
                        className="flex"
                        count={pageCount()}
                        shape="rounded"
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                            setPage(value);
                            searchTasks(searchInput, value, pageSize)
                        }}
                    />
                </div>

            </div>

            {/* MODAL */}
            <Modal
                open={open}
                name={name}
                description={description}
                dueDate={dueDate}
                setName={(val) => setName(val)}
                setDescription={(val) => setDescription(val)}
                setDueDate={(val) => setDueDate(val)}
                updateTask={() => {
                    updateTask({ taskId, name, description, dueDate })
                    setOpen(false)
                }}
            />
        </div>
    )
}
export default TaskLayout