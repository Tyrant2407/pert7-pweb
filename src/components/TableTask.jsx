// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import { getTasks, updateTask, deleteTask } from "../api";

export const TableTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // Tambahkan state error

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to fetch tasks. Please try again later."); // Set pesan error
      }
    };
    fetchTasks();
  }, []);

  const handleUpdateTask = async (taskId) => {
    try {
      // Mengubah status task menjadi "complete" sebelum mengirimkan request update
      const updatedData = { completed: true };
      await updateTask(taskId, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task:", err);
      setError("Failed to update the task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete the task.");
    }
  };

  return (
    <div>
      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}
      <table className="w-full border-collapse table-auto">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="px-4 py-2 border border-slate-400">ID</th>
            <th className="px-4 py-2 border border-slate-400">Task</th>
            <th className="px-4 py-2 border border-slate-400">Status</th>
            <th className="px-4 py-2 border border-slate-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr className="text-center" key={task.id}>
                <td className="px-4 py-2 border border-slate-400">{task.id}</td>
                <td className="px-4 py-2 border border-slate-400">
                  {task.title}
                </td>
                <td className="px-4 py-2 border border-slate-400">
                  {task.completed ? "complete" : "incomplete"}
                </td>
                <td className="flex justify-center h-full gap-3 border border-slate-400">
                  {!task.completed && (
                    <Button
                      className={"bg-green-500 w-fit"}
                      onClick={() => handleUpdateTask(task.id)}
                    >
                      Complete
                    </Button>
                  )}
                  <Button
                    className={"bg-red-500 w-fit"}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="py-4 text-center border border-slate-400"
              >
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
