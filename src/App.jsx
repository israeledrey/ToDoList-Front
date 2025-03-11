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
            <Route path="/" element={<TasksList />} />
            <Route path="/Admin" element={<TasksTable />} />
            <Route path='/Map' element={<TasksMap />} />
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  )
}

export default App
