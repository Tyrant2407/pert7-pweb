// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Button from "./common/Button";
import { addTask } from "../api";

export const FormTask = () => {
  const [task, setTask] = useState({ title: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTasks = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      setError("Task title is required!");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addTask(task);
      setTask({ title: "" });
      window.location.reload(); // Refresh data (opsional)
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while adding the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleAddTasks}
      id="createTaskForm"
      className="flex flex-col items-start gap-3 mb-4"
    >
      <input
        className="flex-grow p-2 border-2 border-gray-400 rounded-lg"
        type="text"
        id="taskInput"
        value={task.title}
        placeholder="Enter new task"
        onChange={(e) => setTask({ title: e.target.value })}
        required
      />

      <div className="flex gap-3">
        <Button
          className="w-32 p-2 text-white bg-blue-500 rounded-md"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </Button>

        {/* Menampilkan error jika ada */}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </form>
  );
};
