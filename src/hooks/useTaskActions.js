import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewTask, updateTask, deleteTask } from '../server/api';
import { taskSchema } from '../validation/TaskSchema';



export const useTaskActions = () => {
    const queryClient = useQueryClient();

    const addTaskMutation = useMutation({
        mutationFn: async (values) => {
            await taskSchema.validate(values);
            return addNewTask(values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });

    const editTaskMutation = useMutation({
        mutationFn: async ({ id, values }) => {
            await taskSchema.validate(values);
            return updateTask(id, values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });

    return {
        handleAddTask: addTaskMutation.mutateAsync,
        handleEditTask: editTaskMutation.mutateAsync,
        handleDeleteTask: deleteTaskMutation.mutateAsync,
    };
};