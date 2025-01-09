import axios from "axios";

// Base URL untuk API
const API_BASE_URL = "http://127.0.0.1:8000/api/posts";

// Fungsi untuk mendapatkan semua posts (tasks)
export const getTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL); // Endpoint yang benar
    return response.data; // Mengembalikan data posts
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error; // Melempar error agar bisa ditangani di komponen
  }
};

// Fungsi untuk menambahkan post (task) baru
export const addTask = async (task) => {
  try {
    const response = await axios.post(API_BASE_URL, task, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
};

// Fungsi untuk memperbarui post (task) berdasarkan ID
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskId}`, updatedData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

// Fungsi untuk menghapus post (task) berdasarkan ID
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${taskId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};
