import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";

import NavBar from '../components/NavBar';
import TasksList from '../pages/TasksList';
import TasksTable from '../pages/TasksTable';
import TasksMap from '../pages/TasksMap';

const Layout = () => (
    <>
        <NavBar /> 
        <Outlet />
    </>
);

const TasksRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<TasksList />} />
                <Route path="table" element={<TasksTable />} />
                <Route path="map" element={<TasksMap />} />
            </Route>
        </Routes>
    );
};

export default TasksRoutes;