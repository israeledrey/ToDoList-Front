import { useState } from 'react'
import { useTasksContext } from "../providers/TasksContext"

import SingleTask from "../components/SingleTask"
import NavBar from "../components/NavBar"
import TaskDealog from "../components/TaskDealog";
import AddTask from '../components/taskAction/AddTask'



const TasksList = () => {

    const { filteredTasks, setFilteredTasks } = useTasksContext();
    const [showPopup, setShowPopup] = useState(false)

    const closePopup = () => {
        setShowPopup(false);
    };


    return (
        <div>

            <NavBar setFilteredTasks={setFilteredTasks} />
            <div style={{ marginTop: "150px" }}>
                {filteredTasks.length > 0
                    ? (
                        <>
                            <p style={{ fontSize: "25px" }}>Tasks List:</p>
                            {filteredTasks.map((task) => (
                                <SingleTask key={task._id} task={task} setShowPopup={setShowPopup} />
                            ))}
                        </>
                    ) : (
                        <p style={{ fontSize: "20px", color: "gray" }}>No tasks found.</p>
                    )}
            </div>
            <AddTask setShowPopup={setShowPopup} />

            {showPopup && <TaskDealog showAddtPopUp={showPopup} onClose={closePopup} />}

        </div>
    )
}

export default TasksList