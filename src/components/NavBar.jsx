
import SearchTask from './SearchTask'

import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



const useStyles = makeStyles({
  appBar: {
    position: "static"
  },
  menuButton: {
    size: "large",
    edge: "start",
    color: "inherit",
  },
  title: {
    flexGrow: 1
  },
  loginButton: {
    color: '#fff'
  }
});


const NavBar = ({ setFilteredTasks }) => {

  const classes = useStyles();



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={classes.title}>
            To Do List
          </Typography>
          <SearchTask setFilteredTasks={setFilteredTasks} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default NavBar