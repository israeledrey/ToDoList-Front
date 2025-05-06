import customAxios from "./customAxios";


export const getAllTasks = async () => {
  try {
    const { data } = await customAxios.get(`/tasks`);
    return data;

  } catch (error) {
    console.error('Error fetching tasks', error);
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

export const updateTask = async (values) => {
  const { _id, ...restValues } = values;

  try {
    const { data } = await customAxios.put(`/tasks/${_id}`, restValues);
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

export const filteredTask = async ({ name, completed }) => {
  try {
    const params = new URLSearchParams();

    if (name) params.append('name', name);
    if (completed) params.append('completed', completed);

    const queryString = params.toString();
    const { data } = await customAxios.get(`/tasks/filter?${queryString}`);
    return data;

  } catch {
    return [];
  }
};

export const getSubjectOption = async () => {
  try {
    const { data } = await customAxios.get(`/tasks/taskSubject`);
    return data;

  } catch {
    return { success: false, message: error.response?.data?.message || "Failed to get the subject" }
  }
}