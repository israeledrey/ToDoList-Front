import React from 'react';
import { useAtom } from 'jotai';
import { isEditingAtom } from '../../atoms/tasksAtoms';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';



const AddTask = ({ setShowDialog }) => {

    const [ ,setIsEditing ] = useAtom(isEditingAtom);

    const handleShowDialog = () => {
        setShowDialog(true)
        setIsEditing(false)
    }

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1000 }}
                onClick={handleShowDialog}
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default AddTask