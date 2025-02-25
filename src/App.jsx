import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksProvider } from "./providers/TasksContext"
import TasksList from './pages/TasksList'
import Admin from './pages/Admin'


function App() {

  return (
    <>
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  )
}

export default App
