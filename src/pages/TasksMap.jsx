import { useFetchTasks } from '../hooks/useFetchTasks';

import BaseMap from '../components/map/BaseMap';
import TasksLayer from '../components/map/TasksLayer';

import { makeStyles } from "@mui/styles";
import { Icon, Style } from 'ol/style';



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
  
  const tasksArray = Object.values(tasks);
  const center = [-118.2437, 34.0522];

  const customLayerStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      scale: 0.04,
      src: "https://www.svgrepo.com/show/3322/duck.svg"
    })
  });


  if (isLoading) return <p className={classes.noTasks}>Loading tasks...</p>;
  if (isError) return <p className={classes.noTasks}>Error fetching tasks.</p>;


  return (
    <div className={classes.mapContainer}>
      <BaseMap className={classes.BaseMap} center={center} zoom={12}>
        <TasksLayer tasks={tasksArray} style={customLayerStyle} />
      </BaseMap>
    </div>

  );
};

export default TasksMap;