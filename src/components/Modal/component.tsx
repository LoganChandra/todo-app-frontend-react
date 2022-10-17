import React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';

// DATE
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UpdateTaskPayload } from '../../models/task';

interface ModalComponentProps {
    open: boolean
    name: string;
    description: string;
    dueDate: Date;
    setName: (value: string) => void;
    setDescription: (value: string) => void;
    setDueDate: (value: Date) => void;
    update: () => void
}

const ModalComponent: React.FC<ModalComponentProps> = ({
    open,
    name,
    description,
    dueDate,
    setName,
    setDescription,
    setDueDate,
    update
}) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    let localOpen = open
    return (
        <Modal
            open={open}
            onClose={() => { open = false }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="flex flex-col w-full gap-y-5">
                    <h1>
                        UPDATE TASK
                    </h1>
                    <TextField label="NAME" variant="standard" value={name} onChange={(e: any) => setName(e.target.value)} />
                    <TextField label="DESCRIPTION" variant="standard" value={description} onChange={(e: any) => setDescription(e.target.value)} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="DUE DATE"
                            value={dueDate}
                            onChange={(e: any) => setDueDate(e.target.value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <div className="flex flex-row justify-between">
                        <Button
                            onClick={() => { open = false }}
                            variant="outlined"
                        >
                            CANCEL
                        </Button>
                        <Button
                            onClick={() => {
                                update()
                            }}
                            variant="contained"
                        >
                            UPDATE
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
export default ModalComponent;