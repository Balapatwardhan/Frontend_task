import React, { useState } from "react";
import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "./Sidebar";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Landing Page Design",
      status: "Done",
      priority: "High",
      lastUpdated: "1 hour ago",
      subtasks: [],
      showSubtasks: false,
    },
    {
      id: 2,
      name: "React Native",
      status: "Pending",
      priority: "Low",
      lastUpdated: "Yesterday",
      subtasks: [],
      showSubtasks: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const toggleSubtasks = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, showSubtasks: !task.showSubtasks } : task
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowForm(true)}
        >
          + Create New Task
        </button>

        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <>
                <tr key={task.id} className="border-b">
                  <td className="p-2 flex items-center">
                    <button onClick={() => toggleSubtasks(task.id)}>
                      {task.showSubtasks ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {task.name}
                  </td>
                  <td>{task.status}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-white ${task.priority === "High" ? "bg-red-500" : "bg-yellow-500"}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.lastUpdated}</td>
                  <td>
                    <MoreVertical className="cursor-pointer" onClick={() => setEditingTask(task)} />
                  </td>
                </tr>
                {task.showSubtasks &&
                  task.subtasks.map((subtask) => (
                    <tr key={subtask.id} className="border-b bg-gray-50">
                      <td className="p-2 pl-10">{subtask.name}</td>
                      <td>{subtask.status}</td>
                      <td>{subtask.deadline}</td>
                      <td></td>
                      <td>
                        <MoreVertical className="cursor-pointer" />
                      </td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">{editingTask ? "Edit Task" : "Add Task"}</h2>
            <input type="text" placeholder="Task Title" className="w-full border p-2 mb-4" />
            <select className="w-full border p-2 mb-4">
              <option>Select Category</option>
            </select>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md" onClick={() => setShowForm(false)}>Save</button>
            <button className="ml-4 text-gray-600" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTracker;
