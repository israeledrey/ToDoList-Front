import * as React from "react";
import { useState } from 'react';
import { useTasksContext } from "../providers/TasksContext";

import TaskDealog from "./TaskDealog"
import TaskDetailsPopUp from "./TaskDetailsPopUp"
import EditTask from "./taskAction/EditTask";
import DeleteTask from "./taskAction/DeleteTask";

import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';





const useStyles = makeStyles({
    taskItem: {
        width: "100%",
        height: "90px",
        maxWidth: 560,
        borderRadius: "4px",
        backgroundColor: "#f0f0f0",
    }
});

const SingleTask = ({ task }) => {

    const classes = useStyles();
    const [showDetailsPopUp, setShowDetailsPopUp] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowDetailsPopUp(false);
        setShowPopup(false);
    };

    const handleShowTaskDetails = (task) => {
        setSelectedTask(task);
        setShowDetailsPopUp(!showDetailsPopUp);
    }

    return (
        <Box>
            <ListItem
                className={classes.taskItem}
                sx={{ mt: 2 }}
                onClick={() => handleShowTaskDetails(task)}
                secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <EditTask setSelectedTask={setSelectedTask} setShowPopup={setShowPopup} task={task} />
                        <DeleteTask task={task} />
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
                        primary={task.taskName}
                        primaryTypographyProps={{ sx: { fontSize: '20px' } }}
                    />
                </ListItemButton>
            </ListItem>

            {showDetailsPopUp && <TaskDetailsPopUp task={selectedTask} onClose={closePopup} />}
            {showPopup && <TaskDealog showAddtPopUp={showPopup} task={selectedTask} onClose={closePopup} />}
        </Box>
    );
}

export default SingleTask