import { useState, useMemo } from 'react';
import { useFetchTasks } from '../hooks/useFetchTasks';
import { useFilteredTasks } from '../hooks/useFilteredTasks';

import SingleTask from "../components/SingleTask";
import NavBar from "../components/NavBar";
import Dialog from "../components/taskDialog/Dialog";
import AddTask from '../components/taskAction/AddTask';

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
    const { data: tasks = [], isLoading, isError } = useFetchTasks();
    const filteredTasks = useFilteredTasks(tasks);
    const [showDialog, setShowDialog] = useState(false);

    console.log(filteredTasks);
    
    const renderTasks = useMemo(() => {
        return filteredTasks.map((task) => (
            <SingleTask key={task._id} task={task} setShowDialog={setShowDialog} />
        ));
    }, [filteredTasks, setShowDialog]);

    const closePopup = () => {
        setShowDialog(false);
    };

    if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
    if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;

    return (
        <>
            <NavBar />
            <div className={classes.tasksContainer}>
                {filteredTasks.length ?
                    <>
                        <p style={{ fontSize: "25px" }}>Tasks List:</p>
                        {renderTasks}
                    </>
                    :
                    <p className={classes.noTasks}>No tasks found.</p>
                }
            </div>
            <AddTask setShowDialog={setShowDialog} />

            {showDialog && <Dialog showDialog={showDialog} onClose={closePopup} />}
        </>
    );
};

export default TasksList;