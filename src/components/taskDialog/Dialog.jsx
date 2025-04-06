import { useAtom } from "jotai";
import { isEditingAtom } from "../../atoms/tasksAtoms";
import { useTaskForm } from "../../hooks/useTaskForm";

import PrioritySlider from "./PrioritySlider";
import DateSelector from "./DateSelector";
import Subject from "./Subject";
import Map from './Map';
import SnackbarComponent from './SnackbarComponent';

import { makeStyles } from '@mui/styles';
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
    zIndex: 1300,
  },
  card: {
    width: '50%',
    maxWidth: '500px',
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


const Dialog = ({ showDialog, onClose, task }) => {
  const classes = useStyles();
  const [ isEditing ] = useAtom(isEditingAtom);
  const { formik, handleFieldChange, handleValidation, snackbar, setSnackbar } = useTaskForm(task, onClose);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })


  return (
    <Backdrop open={showDialog} className={classes.backdrop} onClick={onClose}>
      <Card className={classes.card} onClick={(e) => e.stopPropagation()} variant="outlined">
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          {isEditing ? "Edit Task" : "Add New Task"}
        </Typography>
        <Divider inset="none" />
        <CardContent className={classes.cardContent}>

          <FormControl sx={{ gridColumn: '1/-1', width: '100%' }}>
            <FormLabel>Task Name</FormLabel>
            <Input
              value={formik.values.name}
              onChange={handleFieldChange('name')}
              onBlur={handleValidation('name')}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Task Subject</FormLabel>
            <Subject
              value={formik.values.subject}
              onChange={handleFieldChange('subject')}
              onBlur={handleValidation('subject')}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Day to Complete</FormLabel>
            <DateSelector
              value={formik.values.dayToComplete}
              handleChange={handleFieldChange('dayToComplete')}
              onBlur={handleValidation('dayToComplete')}
            />
          </FormControl>

          <PrioritySlider
            value={parseInt(formik.values.priority)}
            getAriaValueText={(value) => `${value}%`}
            onChange={handleFieldChange('priority')}
            onBlur={handleValidation('priority')}
          />

          <Checkbox
            label="Completed"
            sx={{ gridColumn: "1/-1", my: 1 }}
            checked={formik.values.completed}
            onChange={handleFieldChange('completed')}
            onBlur={handleValidation('completed')}
          />

          <Map
            onLocationSelect={handleFieldChange('location')}
            onBlur={handleValidation('location')}
          />

          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary" onClick={formik.handleSubmit}>
              {isEditing ? "Save Changes" : "Add Task"}
            </Button>
          </CardActions>

        </CardContent>
      </Card>

      <SnackbarComponent snackbar={snackbar} handleCloseSnackbar={handleCloseSnackbar} />

    </Backdrop>
  );
};

export default Dialog;