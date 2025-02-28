import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { MoreVertical, ChevronDown, ChevronUp, Plus, Search } from 'lucide-react';
import AddTaskModal from '../components/AddTaskModal';

const Tasks = () => {
  // State for tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Landing Page Design',
      status: 'Done',
      priority: 'High',
      lastUpdated: '1 hour ago',
      expanded: false,
      subtasks: [],
      timeSpent: 0,
      isRunning: false
    },
    {
      id: 2,
      title: 'Read Notion',
      status: 'Pending',
      priority: 'Low',
      lastUpdated: 'Yesterday',
      expanded: false,
      subtasks: [],
      timeSpent: 0,
      isRunning: false
    },
    {
      id: 3,
      title: 'Landing Page Design',
      status: 'Done',
      priority: 'Medium',
      lastUpdated: 'Yesterday',
      expanded: false,
      subtasks: [],
      timeSpent: 0,
      isRunning: false
    }
  ]);

  // ⏳ Timer logic: Updates time every second for running tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.isRunning ? { ...task, timeSpent: task.timeSpent + 1 } : task
        )
      );
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(null);

  // Filtered tasks based on search query
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Effect to fetch tasks from backend
  useEffect(() => {
    // TODO: Replace with actual API call to Flask backend
    // apiService.getUserTasks(userId)
    //   .then(data => setTasks(data))
    //   .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Toggle task expansion (for subtasks)
  const toggleExpand = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, expanded: !task.expanded } 
        : task
    ));
  };

  // 🟢 Start Timer
  const startTimer = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isRunning: true } : task
      )
    );
  };
  
  // 🔴 Stop Timer
  const stopTimer = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isRunning: false } : task
      )
    );
  };
  
  // 🔄 Reset Timer
  const resetTimer = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isRunning: false, timeSpent: 0 } : task
      )
    );
  };
  
  // ⏳ Format Time (hh:mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  // Handle opening the action menu
  const handleActionMenu = (id, event) => {
    event.stopPropagation();
    if (actionMenuVisible === id) {
      setActionMenuVisible(null);
    } else {
      setActionMenuVisible(id);
    }
  };

  // Open task form for editing
  const openEditTaskForm = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setActionMenuVisible(null);
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setActionMenuVisible(null);
  };

  // Change task status
  const changeTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, lastUpdated: 'Just now' } 
        : task
    ));
    setActionMenuVisible(null);
  };

  // Add new task
  const addTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      lastUpdated: 'Just now',
      expanded: false,
      subtasks: [],
      timeSpent: 0,
      isRunning: false
    };
    setTasks([...tasks, newTask]);
  };

  // Update existing task
  const updateTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === taskData.id 
        ? { ...task, ...taskData, lastUpdated: 'Just now' } 
        : task
    ));
  };

  // Add subtask
  const addSubtask = (parentId, subtask) => {
    setTasks(tasks.map(task => 
      task.id === parentId 
        ? { 
            ...task, 
            subtasks: [...task.subtasks, { ...subtask, id: Date.now() }],
            lastUpdated: 'Just now'
          } 
        : task
    ));
  };

  // Handle form submission (add or update)
  const handleSubmitTask = (taskData) => {
    if (selectedTask) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Return the status badge element based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done':
        return <span className="flex items-center">
          <span className="w-4 h-4 mr-1 text-green-500">✓</span> {status}
        </span>;
      case 'Pending':
        return <span className="flex items-center">
          <span className="w-3 h-3 mr-1 rounded-full bg-yellow-500"></span> {status}
        </span>;
      case 'In Progress':
        return <span className="flex items-center">
          <span className="w-3 h-3 mr-1 rounded-full bg-blue-500"></span> {status}
        </span>;
      default:
        return status;
    }
  };

  // Get priority badge with color
  const getPriorityBadge = (priority) => {
    let bgColor = '';
    switch (priority) {
      case 'High':
        bgColor = 'bg-red-100 text-red-800';
        break;
      case 'Medium':
        bgColor = 'bg-orange-100 text-orange-800';
        break;
      case 'Low':
        bgColor = 'bg-green-100 text-green-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    return <span className={`px-2 py-1 rounded text-xs font-medium ${bgColor}`}>
      {priority}
    </span>;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar component */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-grow overflow-hidden flex flex-col">
          {/* Header with search and create button */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search Something..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              className="ml-4 flex items-center px-4 py-2 bg-purple-500 text-black rounded-lg hover:bg-purple-600 transition"
              onClick={() => {
                setSelectedTask(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={18} className="mr-1" />
              Create New Task
            </button>
          </div>
          
          {/* Tasks Table - Flex-grow and overflow handling */}
          <div className="bg-white rounded-lg shadow flex-grow flex flex-col overflow-hidden">
            {/* Table Header - Fixed alignment issues */}
            <div className="grid grid-cols-12 bg-blue-50 p-4 border-b text-sm font-medium text-blue-800">
              <div className="col-span-3">Task</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Last Updated</div>
              <div className="col-span-2 text-center">Time Spent</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
            
            {/* Table Body with overflow */}
            <div className="flex-grow overflow-y-auto">
              {filteredTasks.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No tasks found. Create a new task to get started.
                </div>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id}>
                    {/* Task Row - Fixed alignment issues */}
                    <div className="grid grid-cols-12 p-4 border-b items-center hover:bg-gray-50">
                      <div className="col-span-3 font-medium">{task.title}</div>
                      <div className="col-span-2">{getStatusBadge(task.status)}</div>
                      <div className="col-span-2">{getPriorityBadge(task.priority)}</div>
                      <div className="col-span-2 text-gray-500 text-sm">{task.lastUpdated}</div>
                      
                      {/* ⏳ Time Spent Column - Reorganized to contain both display and controls */}
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="font-medium">{formatTime(task.timeSpent || 0)}</span>
                        {/* Timer Controls */}
                        <div className="flex">
                          {task.isRunning ? (
                            <button
                              onClick={() => stopTimer(task.id)}
                              className="text-red-500 px-1 rounded-md"
                              title="Stop Timer"
                            >
                              ⏹️
                            </button>
                          ) : (
                            <button
                              onClick={() => startTimer(task.id)}
                              className="text-green-500 px-1 rounded-md"
                              title="Start Timer"
                            >
                              ▶️
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions Column - Clearly separated from timer controls */}
                      <div className="col-span-1 flex justify-end space-x-2">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={(e) => handleActionMenu(`task-${task.id}`, e)}
                          title="More Options"
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => toggleExpand(task.id)}
                          title={task.expanded ? "Collapse" : "Expand"}
                        >
                          {task.expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        
                        {/* Action Menu */}
                        {actionMenuVisible === `task-${task.id}` && (
                          <div className="absolute right-10 mt-32 bg-white shadow-lg rounded-lg z-10 w-48 py-1">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => openEditTaskForm(task)}
                            >
                              Update Task
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => deleteTask(task.id)}
                            >
                              Delete Task
                            </button>
                            <div className="border-t my-1"></div>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => changeTaskStatus(task.id, 'Pending')}
                            >
                              Set Pending
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => changeTaskStatus(task.id, 'In Progress')}
                            >
                              Set In Progress
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => changeTaskStatus(task.id, 'Done')}
                            >
                              Set Done
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Subtasks Container (Expanded) */}
                    {task.expanded && (
                      <div className="bg-gray-50 px-8 py-2">
                        {/* Subtasks List */}
                        {task.subtasks.length > 0 ? (
                          task.subtasks.map(subtask => (
                            <div key={subtask.id} className="grid grid-cols-12 py-3 border-b border-gray-200 items-center">
                              <div className="col-span-4 font-medium pl-4 border-l-2 border-purple-300">
                                {subtask.title}
                              </div>
                              <div className="col-span-2">{getStatusBadge(subtask.status)}</div>
                              <div className="col-span-2">{getPriorityBadge(subtask.priority)}</div>
                              <div className="col-span-2 text-gray-500 text-sm">{subtask.deadline || 'No deadline'}</div>
                              <div className="col-span-2 flex justify-end">
                                <button
                                  className="p-1 hover:bg-gray-200 rounded"
                                  onClick={(e) => handleActionMenu(`subtask-${subtask.id}`, e)}
                                >
                                  <MoreVertical size={18} />
                                </button>
                                
                                {/* Subtask Action Menu */}
                                {actionMenuVisible === `subtask-${subtask.id}` && (
                                  <div className="absolute right-10 mt-24 bg-white shadow-lg rounded-lg z-10 w-48 py-1">
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                      Update Subtask
                                    </button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                      Delete Subtask
                                    </button>
                                    <div className="border-t my-1"></div>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                      Set Pending
                                    </button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                      Set In Progress
                                    </button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                      Set Done
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-3 text-center text-gray-500">
                            No subtasks yet
                          </div>
                        )}
                        
                        {/* Add Subtask Button */}
                        <div className="py-3">
                          <button
                            className="flex items-center px-3 py-1 border border-purple-300 text-purple-600 rounded hover:bg-purple-50"
                            onClick={() => {
                              // Create a modal or form to add subtask
                              alert('Add subtask feature will be implemented here');
                            }}
                          >
                            <Plus size={16} className="mr-1" /> Add Subtask
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Add/Edit Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleSubmitTask}
          initialData={selectedTask}
        />
      )}
    </div>
  );
};

export default Tasks;