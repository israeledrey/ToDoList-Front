import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getAllTasks } from '../server/api';
import { tasksListAtom } from '../atoms/tasksAtoms';



export const useFetchTasks = () => {
    const [, setTasksList] = useAtom(tasksListAtom);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const tasks = await getAllTasks();
            setTasksList(tasks); 
            return tasks;
        }
    });

    return { data, isLoading, isError };
};