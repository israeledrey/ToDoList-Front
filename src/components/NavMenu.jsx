import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";



const NavMenu = ({ anchorEl, setAnchorEl }) => {

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };



  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={() => handleNavigate("/map")}>📍 Map</MenuItem>
      <MenuItem onClick={() => handleNavigate("/")}>✅ Tasks</MenuItem>
      <MenuItem onClick={() => handleNavigate("/table")}>📊 Table</MenuItem>
    </Menu>

  )
}

export default NavMenu