import { useState } from "react";
import SearchTask from "./SearchTask";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles({
  appBar: {
    position: "static",
  },
  menuButton: {
    size: "large",
    edge: "start",
    color: "inherit",
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    color: "#fff",
  },
});

const NavBar = ({ setFilteredTasks }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleNavigate("/map")}>📍 Map</MenuItem>
            <MenuItem onClick={() => handleNavigate("/tasks")}>✅ Tasks</MenuItem>
            <MenuItem onClick={() => handleNavigate("/table")}>📊 Table</MenuItem>
          </Menu>

          <Typography variant="h6" component="div" className={classes.title}>
            To Do List
          </Typography>
          <SearchTask setFilteredTasks={setFilteredTasks} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;