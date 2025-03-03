import React from 'react'
import { useTasksContext } from "../../providers/TasksContext"
import { deleteTask, getAllTasks } from "../../api"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";


const DeleteTask = ({task}) => {

    const { setTasksList } = useTasksContext();

    const handleDeleteTask = async (_id) => {
        try {
            await deleteTask(_id);
            const updatedTasks = await getAllTasks();
            setTasksList(updatedTasks);
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };
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