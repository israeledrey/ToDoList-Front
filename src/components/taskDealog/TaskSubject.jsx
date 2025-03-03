import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TaskSubject({ value, onChange }) {
  const options = [
    { label: 'Work', id: 1 },
    { label: 'leisure', id: 2 },
    { label: 'Studies', id: 3 },
  ];

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.label}
      value={options.find(option => option.label === value) || null}
      onChange={(event, newValue) => onChange(newValue ? newValue.label : "")}
      renderInput={(params) => <TextField {...params} label="Select" />}
    />
  );
}