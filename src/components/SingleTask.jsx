import * as React from "react";
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useTasksContext } from "../providers/TasksContext"
import AddTaskPopUp from "./AddTaskPopUp"
import TaskDetailsPopUp from "./TaskDetailsPopUp"
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { fontSize } from "@mui/system";




const useStyles = makeStyles({
    taskItem: {
        width: "100%",
        height: "90px",
        maxWidth: 560,
        borderRadius: "4px",
        backgroundColor: "#f0f0f0",
    }
})



export default function SingleTask({ task }) {

    const classes = useStyles();
    const { tasksList, setTasksList } = useTasksContext();
    const [showPopup, setShowPopup] = useState(false);
    const [showDetailsPopUp, setShowDetailsPopUp] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);



    const closePopup = () => {
        setShowPopup(false);
        setShowDetailsPopUp(false);
    };

    const handleShowEditTask = (task) => {
        setSelectedTask(task);
        setShowPopup(true);
    };

    const handleShowTaskDetails = (task) => {
        setSelectedTask(task);
        setShowDetailsPopUp(!showDetailsPopUp);
    }

    const handleDeleteTask = (taskId) => {
        setTasksList((prevList) => prevList.filter((task) => task.taskId !== taskId));
    };


    return (
        <Box>

            <ListItem
                className={classes.taskItem}
                sx={{ mt: 2 }}
                onClick={() => handleShowTaskDetails(task)}
                secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton edge="end" aria-label="edit" onClick={(event) => {
                            handleShowEditTask(task)
                            event.stopPropagation();
                        }}>
                            <CreateIcon />
                        </IconButton>

                        <IconButton edge="end" aria-label="delete" onClick={() =>
                            handleDeleteTask(task.taskId)
                        }>
                            <DeleteIcon />
                        </IconButton>   
                    </Box>
                }
                disablePadding
            >
                <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                        <Avatar>
                            <AssignmentIcon />
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText
                        id="single-task-label"
                        primary={task.taskSobject}
                        primaryTypographyProps={{ sx: { fontSize: '20px' } }}
                    />
                </ListItemButton>
            </ListItem>


            {showDetailsPopUp && <TaskDetailsPopUp task={selectedTask} onClose={closePopup} />}
            {showPopup && <AddTaskPopUp showAddtPopUp={showPopup} task={selectedTask} onClose={closePopup} />}
            
        </Box>
    );
}