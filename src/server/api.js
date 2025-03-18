import axios from 'axios';

const API_URL = 'http://localhost:3000';  

// Render all tsks to the client
export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasksList`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching todos', error);
    return []; 
  }
};

// Add new task
export const addNewTask = async (task) => {
  console.log(task);
  
  try {
    const response = await axios.post(`${API_URL}/tasks/createTask`,  task ); 
    return response.data; 
  } catch (error) {
    console.error('Error adding todo', error);
  }
};

// Edit task
export const updateTask = async (_id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/tasksList/${_id}`, updates);
    return response.data; 
  } catch (error) {
    
    console.error('Error updating todo', error);
  }
};

// Delete task
export const deleteTask = async (_id) => {
    if (!_id) throw new Error("Task ID is missing");
  try {
    await axios.delete(`${API_URL}/tasksList/${_id}`);
    
  } catch (error) {
    console.error('Error deleting todo', error);
  }
};