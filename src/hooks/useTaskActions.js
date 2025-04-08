import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewTask, updateTask, deleteTask } from '../server/api';



export const useTaskActions = () => {
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.invalidateQueries(['tasks'])
    }

    const handleError = () => {
        setSnackbar({
            open: true,
            message: error.message || "An error occurred during the operation.",
            severity: 'error',
        });
    }


    const addTaskMutation = useMutation({
        mutationFn: addNewTask,
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const editTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: handleSuccess,
        onError: handleError,
    });

    return {
        handleAddTask: addTaskMutation.mutateAsync,
        handleEditTask: editTaskMutation.mutateAsync,
        handleDeleteTask: deleteTaskMutation.mutateAsync,
    };
};