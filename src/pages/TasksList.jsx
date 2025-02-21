import React, { useState, useEffect } from 'react'
import { useTasksContext } from "../providers/TasksContext"
import SingleTask from "../components/SingleTask"
import AddTaskPopUp from "../components/AddTaskPopUp"
import NavBar from "../components/NavBar"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function TasksList() {

    const { tasksList } = useTasksContext();
    const [showPopup, setShowPopup] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasksList);


    const closePopup = () => {
        setShowPopup(false);
    };

    const tasksToShow = filteredTasks && filteredTasks.length > 0 ? filteredTasks : tasksList;

    return (
        <div>
            
            <NavBar setFilteredTasks={setFilteredTasks}/>
            <div style={{ marginTop: "150px" }}>
                {tasksToShow.length > 0 
                ? (
                    <>
                        <p style={{ fontSize: "25px" }}>Tasks List:</p>
                        {tasksToShow.map((task) => (
                            <SingleTask key={task.taskId} task={task} />
                        ))}
                    </>
                ) : (
                    <p style={{ fontSize: "20px", color: "gray" }}>No tasks found.</p>
                )}
            </div>


            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1000 }}
                onClick={() => setShowPopup(true)}
            >
                <AddIcon />
            </Fab>

            {showPopup && <AddTaskPopUp showAddtPopUp={showPopup} onClose={closePopup} />}

        </div>
    )
}

