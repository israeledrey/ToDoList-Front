import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SelectDateForTask({ func }) {
  
  const handleDateChange = (newValue) => {
    if (newValue) {
      const formattedDate = newValue.format("DD/MM/YYYY"); 
      func(formattedDate); 
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          onChange={handleDateChange}
        />
    </LocalizationProvider>
  );
}