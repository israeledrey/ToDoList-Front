import { useAtom } from "jotai";
import { useDebounce } from 'use-debounce';
import {  searchInputAtom } from "../atoms/tasksAtoms";

export const useFilteredTasks = (tasks) => {
    const [searchInput] = useAtom(searchInputAtom);
    const [debounceValue] = useDebounce(searchInput, 1000);
    const tasksArray = Object.values(tasks);

    if (!debounceValue.trim()) return tasksArray;

    return tasksArray.filter((task) =>
        task.name.toLowerCase().includes(debounceValue.toLowerCase())
    );
};