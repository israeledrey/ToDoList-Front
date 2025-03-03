import React from 'react'
import { useState } from 'react';
import TaskDealog from '../TaskDealog';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const AddTask = () => {

    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
    };


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

            {showPopup && <TaskDealog showAddtPopUp={showPopup} onClose={closePopup} />}

        </>
    )
}

export default AddTask