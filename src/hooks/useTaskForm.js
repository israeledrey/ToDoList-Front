import { useFormik } from 'formik';
import { useAtom } from 'jotai';
import { isEditingAtom, snackbarAtom } from '../atoms/tasksAtoms';
import { useTaskActions } from '../hooks/useTaskActions';
import { taskSchema } from '../validation/TaskSchema';
import { useEffect } from 'react';


export const useTaskForm = (task, onClose) => {

  const [isEditing] = useAtom(isEditingAtom);
  const { handleAddTask, handleEditTask } = useTaskActions();
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);


  const handleFieldChange = (field) => (value) => {

    if (field === 'completed') {
      return formik.setFieldValue(field, value.target.checked);
    }
    if (field === 'priority') {
      return formik.setFieldValue(field, `${value}%`);
    }
    if (field === 'location' || field === 'dayToComplete') {
      return formik.setFieldValue(field, value);
    }
    formik.setFieldValue(field, value.target ? value.target.value : value);
  };


  const handleValidation = (field) => async () => {
    
    formik.setFieldTouched(field, true, true);
    try {
      await taskSchema.validateAt(field, formik.values);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      dayToComplete: "",
      priority: `${20}%`,
      completed: false,
      location: [null, null]
    },
    onSubmit: async (values) => {
      try {
        await taskSchema.validate(values, { abortEarly: false });
        let result;
        if (isEditing) {
          result = await handleEditTask( values );
          onClose();
        } else {
          result = await handleAddTask(values);
          onClose();
        }

        setSnackbar({
          open: false,
          message: result.message,
          severity: result.success ? "success" : "error",
        });

        if (result.success) {
          initialValues(values);
          onClose();
        }

      } catch (error) {
        if (error.name === "ValidationError") {
          setSnackbar({
            open: true,
            message: error.errors[0],
            severity: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: error.message || "Something went wrong.",
            severity: "error"
          });
        }
      }
    },
  });

  useEffect(() => {
    if (isEditing && task) {
      formik.setValues(task);
    }
  }, [task, isEditing]);

  return { formik, handleFieldChange, handleValidation, snackbar, setSnackbar };
};