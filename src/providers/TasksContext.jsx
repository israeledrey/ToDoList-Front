import { createContext, useState, useContext, useEffect } from 'react';
import { getAllTasks } from '../server/api'

export const TasksContext = createContext();


export const TasksProvider = ({ children }) => {
    const [tasksList, setTasksList] = useState([]);
    const initialFormState = {
        taskName: "",
        taskSobject: "",
        dayToComplete: "",
        priority: `${20}%`,
        completed: false,
        location: []
    };
    const [formState, setFormState] = useState(initialFormState);
    const [filteredTasks, setFilteredTasks] = useState(tasksList);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getAllTasks();
                    setTasksList(tasks);
                    setFilteredTasks(tasks);
                    console.log("fff");
                    
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [formState]);

    const resetFormState = () => {
        setFormState({ ...initialFormState });
    };

    return (
        <TasksContext.Provider value={{
            tasksList,
            setTasksList,
            formState,
            setFormState,
            resetFormState,
            filteredTasks,
            setFilteredTasks,
            setIsEditing,
            isEditing
        }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksContext = () => {
    const tasksList = useContext(TasksContext);
    return tasksList
};
