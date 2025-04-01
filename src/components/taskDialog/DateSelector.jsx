import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



 const DateSelector = ({ handleChange }) => {
  
  const onDateSelect = (newValue) => {
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD"); 
      handleChange(formattedDate); 
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          onChange={onDateSelect}
        />
    </LocalizationProvider>
  );
}

export default DateSelector