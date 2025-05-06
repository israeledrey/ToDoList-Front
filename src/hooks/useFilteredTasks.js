import { useAtom } from "jotai";
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { searchInputAtom } from "../atoms/tasksAtoms";
import { filteredTask } from "../server/api";

export const useFilteredTasks = (tasks = {}) => {
    const [searchInput] = useAtom(searchInputAtom);
    const [debouncedValue] = useDebounce(searchInput, 500);

    const isSearchEmpty = !debouncedValue.trim();

    const { data = [], isLoading } = useQuery({
        queryKey: ['filteredTasks', debouncedValue],
        queryFn: () => filteredTask({ name: debouncedValue }),
        enabled: !isSearchEmpty, 
    });

    return {
        tasks: isSearchEmpty ? Object.values(tasks) : data,
        isLoading: isSearchEmpty ? false : isLoading,
    };
};