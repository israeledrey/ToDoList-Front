import { useQuery } from '@tanstack/react-query';
import { getAllTasks } from '../server/api';


export const useFetchTasks = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: getAllTasks,
    });

    return { data, isLoading, isError };
};