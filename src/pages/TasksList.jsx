import React, { useState } from 'react'
import { useTasksContext } from "../providers/TasksContext"
import SingleTask from "../components/SingleTask"
import NavBar from "../components/NavBar"
import AddTask from '../components/taskAction/AddTask'

export default function TasksList() {

    const { filteredTasks, setFilteredTasks } = useTasksContext();


    return (
        <div>

            <NavBar setFilteredTasks={setFilteredTasks} />
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
            <AddTask />

        </div>
    )
}

