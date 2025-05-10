import * as React from 'react';
import { useAtom } from 'jotai';
import { snackbarAtom } from '../../atoms/tasksAtoms.js';

import { useQuery } from '@tanstack/react-query';
import { getSubjectOption } from '../../server/api.js';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Subject = ({ value, onChange }) => {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);


  const handleError = () => {
    setSnackbar({
      open: true,
      message: "error fetching subjects",
      severity: "error",
    });
  }

  const { data: subjects = [], isLoading, isError } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjectOption,
    onError: handleError,
  });



  return (
    <Autocomplete
      disablePortal
      options={subjects}
      getOptionLabel={(option) => option.label}
      value={subjects.find(option => option.label === value) || null}
      onChange={(event, newValue) => onChange(newValue ? newValue.label : "")}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select"
          error={isError}
          helperText={isError ? 'Failed to load options' : ''}
        />
      )}
    />
  );
}

export default Subject