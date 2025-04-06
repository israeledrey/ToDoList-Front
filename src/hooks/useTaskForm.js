import { useFormik } from 'formik';
import { useAtom } from 'jotai';
import { isEditingAtom } from '../atoms/tasksAtoms';
import { useTaskActions } from '../hooks/useTaskActions';
import { taskSchema } from '../validation/TaskSchema';
import { useState, useEffect } from 'react';

export const useTaskForm = (task, onClose) => {
  const [isEditing] = useAtom(isEditingAtom);
  const { handleAddTask, handleEditTask } = useTaskActions();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleFieldChange = (field) => (value) => {
    if (field === 'completed') {
      formik.setFieldValue(field, value.target.checked);
    } else if (field === 'priority') {
      formik.setFieldValue(field, `${value}%`);
    } else if (field === 'location' || field === 'dayToComplete') {
      formik.setFieldValue(field, value);
    } else {
      formik.setFieldValue(field, value.target ? value.target.value : value);
    }
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
          result = await handleEditTask({ id: task._id, values });
          onClose();
        } else {
          result = await handleAddTask(values);
          onClose();
        }

        setSnackbar({
          open: true,
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