import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LowPriorityIcon from '@mui/icons-material/LowPriority';


const TaskDetailsPopUp = ({ task }) => {


  return (

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FormatListBulletedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={task.taskSobject} secondary="Task subject" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CalendarMonthIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={task.dayToComplete} secondary="Deadline" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TaskAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={task.completed} secondary={task.completed ? "Completed" : "No completed"} />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LowPriorityIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={task.priority} secondary="Priority" />
      </ListItem>

    </List>
  );
}

export default TaskDetailsPopUp
