import { useFetchTasks } from '../hooks/useFetchTasks';
import { useAtom } from "jotai";
import { filteredTasksAtom } from "../atoms/tasksAtoms";

import MapComponent from "../components/MapComponent";
import NavBar from "../components/NavBar";
import { makeStyles } from "@mui/styles";



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
  noTasks: {
    fontSize: "20px",
    color: "gray",
    textAlign: "center",
    marginTop: "150px",
  }
});


const TasksMap = () => {

  const { isLoading, isError } = useFetchTasks();
  const classes = useStyles();
  const setFilteredTasks = useAtom(filteredTasksAtom);

  if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
  if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;


  return (
    <>
      <NavBar setFilteredTasks={setFilteredTasks} />
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