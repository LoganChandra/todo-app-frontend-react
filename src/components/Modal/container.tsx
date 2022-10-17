import { UpdateTaskPayload } from '../../models/task';
import ModalComponent from './component';

interface ModalContainerProps {
    open: boolean
    name: string;
    description: string;
    dueDate: Date;
    setName: (value: string) => void;
    setDescription: (value: string) => void;
    setDueDate: (value: Date) => void;
    updateTask: () => void
}

const ModalContainer: React.FC<ModalContainerProps> = ({
    open,
    name,
    description,
    dueDate,
    setName,
    setDescription,
    setDueDate,
    updateTask
}) => {
    return (
        <ModalComponent
            open={open}
            name={name}
            description={description}
            dueDate={dueDate}
            setName={setName}
            setDescription={setDescription}
            setDueDate={setDueDate}
            update={() => { updateTask() }}
        />
    );
};

export default ModalContainer;
