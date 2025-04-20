import { useFetchTasks } from '../hooks/useFetchTasks';

import { useAtom } from 'jotai';
import { mapInstanceAtom } from '../atoms/tasksAtoms';

import BaseMap from '../components/map/BaseMap';
import TasksLayer from '../components/map/TasksLayer';

import { makeStyles } from "@mui/styles";



const useStyles = makeStyles({
  mapContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  BaseMap: {
    width: "95vw",
    height: "80vh",
    borderRadius: "10px",
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

  const classes = useStyles();
  const { tasks, isLoading, isError } = useFetchTasks();
  const [mapInstance] = useAtom(mapInstanceAtom);

  const iconUrl = "https://www.svgrepo.com/show/3322/duck.svg";
  if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
  if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;


  return (
    <div className={classes.mapContainer}>
      <BaseMap className={classes.BaseMap} center={[-118.2437, 34.0522]} zoom={12}>
        <TasksLayer mapInstance={mapInstance} tasks={Object.values(tasks)} iconUrl={iconUrl} />
      </BaseMap>
    </div>

  );
};

export default TasksMap;