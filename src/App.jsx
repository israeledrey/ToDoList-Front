import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksProvider } from "./providers/TasksContext"
import TasksList from './pages/TasksList'


function App() {

  return (
    <>
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<TasksList />} />
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  )
}

export default App
