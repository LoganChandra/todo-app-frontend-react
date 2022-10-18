// EXTERNAL
import React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ModalComponentProps {
    type: string;
    open: boolean;
    name: string;
    description: string;
    dueDate: Date;
    setName: (payload: string) => void;
    setDescription: (payload: string) => void;
    setDueDate: (payload: Date) => void;
    update: () => void;
    cancel: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
    type,
    open,
    name,
    description,
    dueDate,
    setName,
    setDescription,
    setDueDate,
    update,
    cancel
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
    return (
        // MODAL
        <Modal
            open={open}
            onClose={() => { open = false }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/* OUTER BOX */}
            <Box sx={style}>

                {/* MODAL FORM */}
                <div className="flex flex-col w-full gap-y-5">
                    {/* TITLE */}
                    <h1>{type} TASK</h1>

                    {/* NAME */}
                    <TextField label="NAME" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />

                    {/* DESCRPITION */}
                    <TextField label="DESCRIPTION" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} />

                    {/* DATEPICKER */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="DUE DATE"
                            value={dueDate}
                            onChange={(val) => setDueDate(val || new Date())}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-row justify-between">
                        {/* CANCEL */}
                        <Button
                            onClick={() => cancel()}
                            variant="outlined"
                        >
                            CANCEL
                        </Button>

                        {/* TYPE */}
                        <Button
                            onClick={() => update()}
                            variant="contained"
                        >
                            {type}
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
export default ModalComponent;