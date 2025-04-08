import customAxios from "./customAxios";


export const getAllTasks = async () => {

  try {
    const { data } = await customAxios.get(`/tasks`);
    return data;

  } catch (error) {
    console.error('Error fetching todos', error);
    throw error; 
  }
};

export const addNewTask = async (task) => {

  try {
    const { data } = await customAxios.post(`/tasks/createTask`, task);
    return data;

  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to add task" }
  }
};

export const updateTask = async (_id, values) => {

  try {
    const { data } = await customAxios.put(`/tasks/${_id}`, values);
    return data;

  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to update task" }
  }
};

export const deleteTask = async (_id) => {

  try {
    const { data } = await customAxios.delete(`/tasks/${_id}`);
    return data;

  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to delete task" }
  }
};