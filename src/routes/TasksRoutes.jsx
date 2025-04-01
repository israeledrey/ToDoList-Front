import React from 'react'
import { Routes, Route } from "react-router-dom";

import TasksList from '../pages/TasksList';
import TasksTable from '../pages/TasksTable';
import TasksMap from '../pages/TasksMap';



const TasksRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/table" element={<TasksTable />} />
            <Route path='/map' element={<TasksMap />} />
        </Routes>
    )
}

export default TasksRoutes