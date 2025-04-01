import { atom } from 'jotai';


export const tasksListAtom = atom([]);

export const isEditingAtom = atom(false);

export const searchInputAtom = atom("");

export const filteredTasksAtom = atom((get) => {
    const tasks = get(tasksListAtom);
    const searchInput = get(searchInputAtom).toLowerCase();

    if (!searchInput.trim()) return tasks;

    return tasks.filter((task) =>
        task.name.toLowerCase().includes(searchInput)
    );
});

