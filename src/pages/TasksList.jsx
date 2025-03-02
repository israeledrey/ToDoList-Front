import React, { useState } from 'react'
import { useTasksContext } from "../providers/TasksContext"
import SingleTask from "../components/SingleTask"
import AddTaskPopUp from "../components/AddTaskPopUp"
import NavBar from "../components/NavBar"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function TasksList() {

    const { tasksList, filteredTasks, setFilteredTasks } = useTasksContext();
    const [showPopup, setShowPopup] = useState(false);
    
    const closePopup = () => {
        setShowPopup(false);
    };

    
    return (
        <div>
            
            <NavBar setFilteredTasks={setFilteredTasks}/>
            <div style={{ marginTop: "150px" }}>
                {filteredTasks.length > 0 
                ? (
                    <>
                        <p style={{ fontSize: "25px" }}>Tasks List:</p>
                        {filteredTasks.map((task) => (
                            <SingleTask key={task._id} task={task} />
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

