import { useAtom } from "jotai";
import {  searchInputAtom } from "../atoms/tasksAtoms";

export const useFilteredTasks = (tasks) => {
    const [searchInput] = useAtom(searchInputAtom);

    if (!searchInput.trim()) return tasks;

    return tasks.filter((task) =>
        task.name.toLowerCase().includes(searchInput.toLowerCase())
    );
};