import './App.css'
import { BrowserRouter } from "react-router-dom";
import TasksRoutes from './routes/TasksRoutes';



function App() {

  return (
    <>
      <BrowserRouter>
          <TasksRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
