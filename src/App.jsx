import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksProvider } from "./providers/TasksContext"
import TasksList from './pages/TasksList'
import TasksTable from './pages/TasksTable'
import TasksMap from './pages/TasksMap'


function App() {

  return (
    <>
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/table" element={<TasksTable />} />
            <Route path='/map' element={<TasksMap />} />
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  )
}

export default App
