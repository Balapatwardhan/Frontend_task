import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Plus, Calendar } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Default task data
  const defaultTaskData = {
    title: '',
    category: '',
    priority: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
    subtasks: []
  };

  // Task form data
  const [taskData, setTaskData] = useState(initialData || defaultTaskData);
  
  // Temporary subtask
  const [newSubtask, setNewSubtask] = useState({ title: '', status: 'Pending' });
  
  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setTaskData(initialData);
    } else {
      setTaskData(defaultTaskData);
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  };

  // Handle new subtask input changes
  const handleSubtaskChange = (e) => {
    const { name, value } = e.target;
    setNewSubtask({
      ...newSubtask,
      [name]: value
    });
  };

  // Add subtask to list
  const addSubtask = () => {
    if (newSubtask.title.trim()) {
      setTaskData({
        ...taskData,
        subtasks: [
          ...taskData.subtasks,
          { ...newSubtask, id: Date.now() }
        ]
      });
      setNewSubtask({ title: '', status: 'Pending' });
    }
  };

  // Remove subtask from list
  const removeSubtask = (id) => {
    setTaskData({
      ...taskData,
      subtasks: taskData.subtasks.filter(subtask => subtask.id !== id)
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
  };

  // Categories for dropdown
  const categories = ['Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'];
  
  // Priorities for dropdown
  const priorities = ['High', 'Medium', 'Low'];

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-medium text-gray-900">
            {initialData ? 'Update task' : 'Add task'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body - Task Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="This is a title"
              required
            />
          </div>
          
          {/* Category Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={taskData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                required
              >
                <option value="" disabled>Select Category of Task</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Subtasks Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Tasks
            </label>
            
            {/* Existing Subtasks */}
            {taskData.subtasks.length > 0 && (
              <div className="mb-2 space-y-2">
                {taskData.subtasks.map(subtask => (
                  <div key={subtask.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{subtask.title}</span>
                    <button
                      type="button"
                      onClick={() => removeSubtask(subtask.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add New Subtask */}
            <div className="flex space-x-2">
              <input
                type="text"
                name="title"
                value={newSubtask.title}
                onChange={handleSubtaskChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add a subtask"
              />
              <button
                type="button"
                onClick={addSubtask}
                className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
              >
                <Plus size={16} className="mr-1" /> Add
              </button>
            </div>
          </div>
          
          {/* Priority Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="relative">
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                required
              >
                <option value="" disabled>Select Priority of Task</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Deadline Fields */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Set deadline
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={taskData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Start Date"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="endDate"
                  value={taskData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="End Date"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Form Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;