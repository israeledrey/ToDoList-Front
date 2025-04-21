import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

const TaskToolTip = ({ title, children }) => {
  return (
    <Tooltip title={title} placement="top">
      <span style={{ display: 'inline-block' }}>{children}</span>
    </Tooltip>
  );
};

export default TaskToolTip;