import { useTasksContext } from '../providers/TasksContext';
import { addNewTask, updateTask, deleteTask, getAllTasks } from '../api';

export const useTaskActions = () => {
    const { formState, setTasksList, resetFormState } = useTasksContext();

    const handleAddTask = async () => {
        const newTask = await addNewTask(formState);
        setTasksList(prevTasks => [...prevTasks, newTask]);
        resetFormState();
    };

    const handleEditTask = async (task) => {
        const updatedTask = await updateTask(task._id, formState);
        if (!updatedTask) {
            console.error("Failed to update task");
            return;
        }
        setTasksList((prevList) =>
            prevList.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
    };

    const handleDeleteTask = async (_id) => {
        try {
            await deleteTask(_id);
            const updatedTasks = await getAllTasks();
            setTasksList(updatedTasks);
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    return { handleAddTask, handleEditTask, handleDeleteTask };
};