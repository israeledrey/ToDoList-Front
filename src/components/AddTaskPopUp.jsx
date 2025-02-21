import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useTasksContext } from "../providers/TasksContext"
import TaskPrioritySlider from "./TaskPrioritySlider"
import SelectDateForTask from "./SelcetDateForTask"
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Backdrop from '@mui/material/Backdrop';

const useStyles = makeStyles({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  card: {
    width: '50%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
  },
  cardContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
    gap: 1.5,
  }
});

export default function AddTaskPopUp({ showAddtPopUp, onClose, task }) {
  const classes = useStyles();
  const { tasksList, setTasksList, formState, setFormState, resetFormState } = useTasksContext();

  const isEditing = !!task;



  useEffect(() => {
    if (task) {
      setFormState(task);
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormState((prevValue) => ({ ...prevValue, [field]: value }));
  };

  
  const handleSaveTask = () => {
    if (isEditing) {
      // Edit task
      setTasksList((prevList) =>
        prevList.map((task) => (task.taskId === formState.taskId ? formState : task))
      );
      console.log(formState);
    } else {
      // Add task
      setTasksList([...tasksList, formState]); 
      resetFormState(); 
      console.log("Updated tasksList:", tasksList);
    }

    onClose();
  };





  return (
    <Backdrop open={showAddtPopUp} className={classes.backdrop} onClick={onClose}>
      <Card className={classes.card} onClick={(e) => e.stopPropagation()} variant="outlined">
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          {isEditing ? "Edit Task" : "Add New Task"}
        </Typography>
        <Divider inset="none" />
        <CardContent className={classes.cardContent}>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Task Subject</FormLabel>
            <Input
              value={formState.taskSobject}
              onChange={(e) => handleInputChange("taskSobject", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Task Content</FormLabel>
            <Input
              sx={{ height: '150px' }}
              endDecorator={<EditCalendarIcon />}
              value={formState.taskContent}
              onChange={(e) => handleInputChange("taskContent", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Day to Complete</FormLabel>
            <SelectDateForTask
              value={formState.dayToComplete}
              func={(newValue) => handleInputChange("dayToComplete", newValue)}
            />
          </FormControl>
          <TaskPrioritySlider
            value={parseInt(formState.priority)}
            getAriaValueText={(value) => `${value}%`}
            fun={(newValue) => handleInputChange("priority", `${newValue}%`)}
          />
          <Checkbox
            label="Completed"
            sx={{ gridColumn: '1/-1', my: 1 }}
            checked={formState.completed}
            onClick={() => handleInputChange("completed", !formState.completed)}
          />
          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary" onClick={handleSaveTask}>
              {isEditing ? "Save Changes" : "Add Task"}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Backdrop>
  );
}