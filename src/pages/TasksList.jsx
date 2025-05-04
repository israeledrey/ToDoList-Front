import { useState, useMemo } from 'react';
import { useFetchTasks } from '../hooks/useFetchTasks';
import { useFilteredTasks } from '../hooks/useFilteredTasks';

import SingleTask from "../components/SingleTask";
import Dialog from "../components/taskDialog/Dialog";
import AddTask from '../components/taskAction/AddTask';
import SnackbarComponent from '../components/taskDialog/SnackbarComponent';

import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
    tasksContainer: {
        marginTop: "150px"
    },
    noTasks: {
        fontSize: "20px",
        color: "gray",
        textAlign: "center",
        marginTop: "150px",
    }
});



const TasksList = () => {

    const classes = useStyles();
    const { tasks, isLoading, isError, setSnackbar, snackbar } = useFetchTasks();
    const { tasks: filteredTasks, isLoading: isFilteredLoading } = useFilteredTasks(tasks); 

    
    const tasksArray = Object.values(filteredTasks);
    const [showDialog, setShowDialog] = useState(false);

    const renderTasks = useMemo(() => {

        if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
        if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;
        if (!filteredTasks) return <p className={classes.noTasks}>No tasks found.</p>;

        return (
            <>
                <p style={{ fontSize: "25px" }}>Tasks List:</p>
                {tasksArray.map((task) => (
                    <SingleTask key={task._id} task={task} setShowDialog={setShowDialog} />
                ))}
            </>
        );

    }, [filteredTasks, isLoading, isFilteredLoading, setShowDialog, classes.noTasks]);


    const closePopup = () => {
        setShowDialog(false);
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

    return (
        <>
            <div className={classes.tasksContainer}>{renderTasks}</div>

            <AddTask setShowDialog={setShowDialog} />
            <SnackbarComponent snackbar={snackbar} handleCloseSnackbar={handleCloseSnackbar} />
            {showDialog && <Dialog showDialog={showDialog} onClose={closePopup} />}

        </>
    );
};

export default TasksList;