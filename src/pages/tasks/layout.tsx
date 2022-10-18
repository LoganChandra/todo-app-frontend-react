// EXTERNAL
import { useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Pagination } from "@mui/material";

// INTERNAL
import ModalComponent from "../../components/Modal";
import FilterBarComponent from "../../components/FilterBar";
import { SearchTaskInput, Task } from "../../models/task";
import { UpdateTaskPayload } from "../../models/task";

interface TaskLayoutProps {
    taskData: Task[],
    totalCount: number,
    columns: GridColDef[],
    searchTasks: (payload: SearchTaskInput) => void,
    updateTask: (payload: UpdateTaskPayload) => void,
    addTask: (payload: UpdateTaskPayload) => void
}

const TaskLayout: React.FC<TaskLayoutProps> = ({
    taskData,
    totalCount,
    columns,
    searchTasks,
    updateTask,
    addTask
}) => {
    // TABLE STATES
    const [search, setSearchInput] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    // MODAL STATES
    const [open, setOpen] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [type, setType] = useState<string>("");

    // FUNCTION TO SHOW MODAL
    const showModal = (event: GridRowParams) => {
        setName(event.row.name)
        setDescription(event.row.description)
        setDueDate(event.row.dueDate)
        setTaskId(event.row.taskId)
        setType("UPDATE")
        setOpen(true)
    }

    // FUNCTION TO CALCULATE PAGE COUNT
    const pageCount = () => {
        return (pageSize &&
            pageSize !== 0
            ? Math.ceil(
                totalCount / pageSize
            )
            : totalCount);
    }

    // FUNCTION TO TRIGGER SEARCH
    const triggerSearch = (params: SearchTaskInput) => {
        setPage(1)
        params.page = 1
        searchTasks(params)
    }
    return (
        <div className="flex flex-col w-full">

            {/* TITLE */}
            <p className="text-4xl font-semibold mb-4">TODO or NOT TODO</p>

            {/* FILTER BAR */}
            <FilterBarComponent
                pageSize={pageSize}
                page={page}
                search={search}
                setPageSize={setPageSize}
                setSearchInput={setSearchInput}
                searchTasks={triggerSearch}
                setType={setType}
                setOpen={setOpen}
            />

            {/* DATA TABLE  */}
            <div style={{ height: 400, width: '100%' }}>
                {/* DATA GRID  */}
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
                <div className="flex w-fit mx-auto mt-3">
                    <Pagination
                        className="flex"
                        count={pageCount()}
                        shape="rounded"
                        page={page}
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                            setPage(value);
                            searchTasks({ search, page: value, pageSize })
                        }}
                    />
                </div>
            </div>

            {/* MODAL */}
            <ModalComponent
                type={type}
                open={open}
                name={name}
                description={description}
                dueDate={dueDate}
                setName={(val) => setName(val)}
                setDescription={(val) => setDescription(val)}
                setDueDate={(val) => setDueDate(val)}
                update={() => {
                    if (type === "UPDATE") {
                        updateTask({ taskId, name, description, dueDate })
                        setOpen(false)
                    } else if (type === "ADD") {
                        addTask({ name, description, dueDate })
                        setOpen(false)
                    }
                }}
                cancel={() => {
                    setName("")
                    setDescription("")
                    setDueDate(new Date())
                    setOpen(false)
                }}
            />
        </div>
    )
}
export default TaskLayout