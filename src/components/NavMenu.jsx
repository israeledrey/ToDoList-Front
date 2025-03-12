import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  select: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    cursor: "pointer",
    outline: "none",
    backgroundColor: "#fff",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
    "&:focus": {
      border: "1px solid #4CAF50",
    },
  },
});


const Navigation = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const handleChange = (e) => {
    navigate(`/${e.target.value}`);
  };


  return (
    <div className={classes.container}>
      <select className={classes.select} defaultValue="tasks" onChange={handleChange}>
        <option value="map">📍 Map</option>
        <option value="tasks">✅ Tasks</option>
        <option value="table">📊 Table</option>
      </select>
    </div>
  );
};

export default Navigation;