import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';



const AddTask = ({ setShowPopup }) => {


    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1000 }}
                onClick={() => setShowPopup(true)}
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default AddTask