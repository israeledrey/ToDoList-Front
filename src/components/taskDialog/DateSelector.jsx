import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateSelector = ({ value, handleChange, onBlur }) => {
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
        value={value ? dayjs(value) : null}
        onChange={onDateSelect}
        slotProps={{
          textField: { onBlur },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;