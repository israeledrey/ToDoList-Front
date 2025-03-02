import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksProvider } from "./providers/TasksContext"
import TasksList from './pages/TasksList'
import TasksTable from './pages/TasksTable'


function App() {

  return (
    <>
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/Admin" element={<TasksTable />} />
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  )
}

export default App
