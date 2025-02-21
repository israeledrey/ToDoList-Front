import React, { createContext, useState, useContext, useEffect } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasksList, setTasksList] = useState([]);
    const initialFormState = {
        taskId: crypto.randomUUID(),
        taskSobject: "",
        taskContent: "",
        dayToComplete: "",
        priority: `${20}%`,
        completed: false
    };
    const [formState, setFormState] = useState(initialFormState);

    const resetFormState = () => {
        setFormState({ ...initialFormState, taskId: crypto.randomUUID() }); 
    };

    return (
        <TasksContext.Provider value={{ tasksList, setTasksList, formState, setFormState, resetFormState }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksContext = () => {
    const tasksList = useContext(TasksContext);
    return tasksList
};
