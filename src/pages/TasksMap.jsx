import MapComponent from "../components/MapComponent";
import NavBar from "../components/NavBar";
import { makeStyles } from "@mui/styles";
import { useTasksContext } from "../providers/TasksContext";

const useStyles = makeStyles({
  mapContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  mapWrapper: {
    width: "80vw",
    height: "80vh",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
});

const TasksMap = () => {
  const classes = useStyles();
  const { setFilteredTasks } = useTasksContext();

  


  return (
    <>
      <NavBar setFilteredTasks={setFilteredTasks}/>
      <div className={classes.mapContainer}>
        <div className={classes.mapWrapper}>
        <MapComponent 
        style={{ width: "80vw", height: "80vh" }} 
        zoom={10} center={[-118.2437, 34.0522]} 
        iconUrl={"https://www.svgrepo.com/show/3322/duck.svg"}
        mode={"admin"}
        />
        </div>
      </div>
    </>

  );
};

export default TasksMap;