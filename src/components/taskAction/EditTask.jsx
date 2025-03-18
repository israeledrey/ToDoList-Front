import React from 'react';

import IconButton from "@mui/material/IconButton";
import CreateIcon from '@mui/icons-material/Create';
import { useTasksContext } from '../../providers/TasksContext';



const EditTask = ({ setSelectedTask, setShowPopup, task }) => {

    const { setIsEditing } = useTasksContext();
    
    const handleShowEditTask = () => {
        setSelectedTask(task); 
        setShowPopup(true);
    };

    return (
        <>
            <IconButton
                edge="end"
                aria-label="edit"
                onClick={(event) => {
                    setIsEditing(true);
                    handleShowEditTask();
                    event.stopPropagation();
                }}>
                <CreateIcon />
            </IconButton>
        </>
    );
}

export default EditTask;