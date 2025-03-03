import React from 'react'
import IconButton from "@mui/material/IconButton";
import CreateIcon from '@mui/icons-material/Create';

const EditTask = ({ setSelectedTask, setShowPopup, task }) => {

    const handleShowEditTask = () => {
        setSelectedTask(task);
        setShowPopup(true);
    };

    return (
        <>
            <IconButton
                edge="end"
                aria-label="edit"
                onClick={(event) => {
                    handleShowEditTask(task)
                    event.stopPropagation();
                }}>
                <CreateIcon />
            </IconButton>
        </>
    )
}

export default EditTask