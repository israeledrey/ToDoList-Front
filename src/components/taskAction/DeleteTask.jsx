import React from 'react'
import { useTaskActions } from '../../hooks/useTaskActions';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";



const DeleteTask = ({task}) => {

    const { handleDeleteTask } = useTaskActions();

    
    return (
        <IconButton
            edge="end"
            aria-label="delete"
            onClick={(event) => {
                handleDeleteTask(task._id)
                event.stopPropagation();
            }}>
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteTask