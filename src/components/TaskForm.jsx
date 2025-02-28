import { useState } from "react";
import React from "react";

function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    name: "",
    deadline: "",
    category: "General",
    priority: "Medium",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.deadline) return;
    addTask(task);
  
    // 🔹 Premium Feature: Simulate email reminder
    setTimeout(() => {
      alert(`Reminder: Task "${task.name}" is due soon!`);
    }, 5000); // 5 seconds (Replace with real email API)
  
    setTask({ name: "", deadline: "", category: "General", priority: "Medium" });
  };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!task.name || !task.deadline) return;
//     addTask(task);
//     setTask({ name: "", deadline: "", category: "General", priority: "Medium" });
//   };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <input
        type="text"
        placeholder="Task Name"
        className="border p-2 w-full mb-2"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={task.deadline}
        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
      />
      <select
        className="border p-2 w-full mb-2"
        value={task.category}
        onChange={(e) => setTask({ ...task, category: e.target.value })}
      >
        <option value="General">General</option>
        <option value="School">School</option>
        <option value="Hackathon">Hackathon</option>
      </select>
      <select
        className="border p-2 w-full mb-2"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button className="bg-blue-500 text-white p-2 w-full">Add Task</button>
    </form>
  );
}

export default TaskForm;
