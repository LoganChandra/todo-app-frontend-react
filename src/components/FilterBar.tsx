// EXTERNAL
import React from 'react';
import { Button, TextField } from '@mui/material';

// INTERNAL
import { SearchTaskInput } from '../models/task';

interface FilterBarComponentProps {
    pageSize: number;
    page: number;
    search: string;
    setPageSize: (payload: number) => void;
    setSearchInput: (payload: string) => void;
    searchTasks: (payload: SearchTaskInput) => void,
    setType: (payload: string) => void;
    setOpen: (payload: boolean) => void;
}

const FilterBarComponent: React.FC<FilterBarComponentProps> = ({
    pageSize,
    page,
    search,
    setPageSize,
    setSearchInput,
    searchTasks,
    setType,
    setOpen
}) => {

    return (
        <div className="flex flex-row justify-between">

            {/* INPUTS */}
            <div className="flex flex-row gap-x-5">

                {/* PAGE SIZE */}
                <TextField label="Items per page" variant="standard"
                    value={pageSize}
                    onChange={(event) => {
                        setPageSize(parseInt(event.target.value) || 0)
                        searchTasks({ search, page, pageSize: parseInt(event.target.value) || 0 });
                    }} />

                {/* SEARCH */}
                <TextField label="Search" variant="standard" onChange={(event) => {
                    setSearchInput(event.target.value)
                    if (event.target.value.length < 1) {
                        searchTasks({ search: "", page, pageSize })
                    }
                }
                }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            searchTasks({ search, page, pageSize });
                        }
                    }}
                />

            </div>

            {/* BUTTONS */}
            <div className="flex flex-row gap-x-5 h-8 mt-2">
                {/* SEARCH */}
                <Button
                    onClick={() => searchTasks({ search, page, pageSize })}
                    variant="contained"
                >
                    SEARCH
                </Button>

                {/* ADD */}
                <Button
                    onClick={() => {
                        setType("ADD")
                        setOpen(true)
                    }}
                    variant="contained"
                >
                    ADD
                </Button>
            </div>
        </div>
    );
}
export default FilterBarComponent;