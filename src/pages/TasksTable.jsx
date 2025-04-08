import { useState, useMemo } from 'react';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import { useFetchTasks } from '../hooks/useFetchTasks';

import Container from '../components/table/Container'
import Dialog from '../components/taskDialog/Dialog';
import AddTask from '../components/taskAction/AddTask';
import SnackbarComponent from '../components/taskDialog/SnackbarComponent';

import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
  noTasks: {
    fontSize: "20px",
    color: "gray",
    textAlign: "center",
    marginTop: "150px",
  }
});


const TasksTable = () => {

  const classes = useStyles();
  const { tasks, isLoading, isError, setSnackbar, snackbar } = useFetchTasks();
  
  const filteredTasks = useFilteredTasks(tasks);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const renderTable = useMemo(() => {

    if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
    if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;
    if (!filteredTasks) return <p className={classes.noTasks}>No tasks found.</p>;


    return (
      <Container
        tasks={filteredTasks}
        setShowDialog={setShowDialog}
        setSelectedTask={setSelectedTask}
      />
    );
  }, [filteredTasks, setShowDialog, setSelectedTask, classes.noTasks]);


  const closePopup = () => {
    setShowDialog(false);
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })


  return (
    <>
      <div>{renderTable}</div>

      <AddTask setShowDialog={setShowDialog} />
      <SnackbarComponent snackbar={snackbar} handleCloseSnackbar={handleCloseSnackbar} />
      {showDialog && <Dialog showDialog={showDialog} task={selectedTask} onClose={closePopup} />}
    </>
  );
}

export default TasksTable