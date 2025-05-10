import React from 'react';
import { useAtom } from 'jotai';
import { isEditingAtom } from '../../atoms/tasksAtoms';
import IconButton from "@mui/material/IconButton";
import CreateIcon from '@mui/icons-material/Create';



const EditTask = ({ setSelectedTask, setShowDialog, task }) => {

    const [, setIsEditing] = useAtom(isEditingAtom);

    const handleShowEditDialog = (event) => {
        setSelectedTask(task);        
        setShowDialog(true);
        setIsEditing(true);
        event.stopPropagation();
    };

    return (
        <IconButton
            edge="end"
            aria-label="edit"
            onClick={handleShowEditDialog}
        >
            <CreateIcon />
        </IconButton>
    );
}

export default EditTask;