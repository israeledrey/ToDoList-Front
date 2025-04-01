import { useState } from 'react';
import { useAtom } from 'jotai';
import { filteredTasksAtom } from '../atoms/tasksAtoms'
import { useFetchTasks } from '../hooks/useFetchTasks';

import NavBar from '../components/NavBar';
import Container from '../components/table/Container'
import Dialog from '../components/taskDialog/Dialog';
import AddTask from '../components/taskAction/AddTask';

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
  const { isLoading, isError } = useFetchTasks();
  const [filteredTasks, setFilteredTasks] = useAtom(filteredTasksAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const closePopup = () => {
    setShowDialog(false);
  };

  if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
  if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;


  return (
    <>
      <NavBar setFilteredTasks={setFilteredTasks} />

      {
        filteredTasks.length ?
          <Container tasks={filteredTasks} setShowDialog={setShowDialog} setSelectedTask={setSelectedTask} />
          :
          <p className={classes.noTasks}>No tasks found.</p>
      }

      <AddTask setShowDialog={setShowDialog} />
      {showDialog && <Dialog showDialog={showDialog} task={selectedTask} onClose={closePopup} />}
    </>
  );
}

export default TasksTable