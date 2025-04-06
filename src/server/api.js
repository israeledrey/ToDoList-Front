import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Render all tasks to the client
export const getAllTasks = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/tasks`);
    return data;
  } catch (error) {
    console.error('Error fetching todos', error);
    return [];
  }
};

// Add new task
export const addNewTask = async (task) => {
  try {
    const { data } = await axios.post(`${API_URL}/tasks/createTask`, task);
    return data;
  } catch (error) {
    return { success: false, message: err.response?.data?.message || "Failed to add task" }
  }
};

// Edit task
export const updateTask = async (_id, values) => {
  try {
    const { data } = await axios.put(`${API_URL}/tasks/${_id}`, values);
    console.log(values);

    return data;
  } catch (error) {
    return { success: false, message: err.response?.data?.message || "Failed to update task" }
  }
};

// Delete task
export const deleteTask = async (_id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${_id}`);

  } catch (error) {
    return { success: false, message: err.response?.data?.message || "Failed to delete task" }
  }
};