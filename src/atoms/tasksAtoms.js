import { atom } from 'jotai';



export const isEditingAtom = atom(false);

export const searchInputAtom = atom("");

export const snackbarAtom = atom({ open: false, message: '', severity: 'success' });



