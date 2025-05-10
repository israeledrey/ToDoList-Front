import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { snackbarAtom } from '../atoms/tasksAtoms';
import { useQuery } from '@tanstack/react-query';
import { getAllTasks } from '../server/api';




export const useFetchTasks = () => {
    const [snackbar, setSnackbar] = useAtom(snackbarAtom);

    const handleError = () => {
        setSnackbar({
            open: true,
            message: "error fetching tasks",
            severity: "error",
        });
    }

    const { data: tasksArray = [], isLoading, isError, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: getAllTasks,
        onError: handleError,
    });

    const tasksById = useMemo(() => {
        return tasksArray.reduce((acc, task) => {
            acc[task._id] = task;
            return acc;
        }, {});
    }, [tasksArray]);

    return { tasks: tasksById, isLoading, isError, error, setSnackbar, snackbar };
    
};