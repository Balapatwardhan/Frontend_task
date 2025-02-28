import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

// Dummy data for tasks
const taskData = [
  {
    id: 1,
    name: "Landing Page Design",
    overdue: "2 days late",
    progress: 100,
    deadline: "10 days left",
    status: "in-progress"
  },
  {
    id: 2,
    name: "React Native",
    overdue: "2 days late",
    progress: 60,
    deadline: "Completed",
    status: "in-progress"
  },
  {
    id: 3,
    name: "Landing Page Design",
    overdue: "2 days late",
    progress: 80,
    deadline: "1 month left",
    status: "in-progress"
  },
  // Add more tasks as needed
];

// Sidebar component
<Sidebar />

// Sidebar item component
const SidebarItem = ({ icon, text, active }) => {
  return (
    <div className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${active ? 'bg-purple-50' : ''}`}>
      <div className="mr-3">{icon}</div>
      <span className={`${active ? 'font-medium' : ''}`}>{text}</span>
    </div>
  );
};

// Summary card component
const SummaryCard = ({ icon, title, count, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold">{count}</h2>
        <p className="text-gray-500">{title}</p>
      </div>
    </div>
  );
};

// Tasks left card with illustration
const TasksLeftCard = ({ count }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
      <h2 className="text-xl mb-2">Tasks Left</h2>
      <div className="flex items-center">
        <h3 className="text-7xl font-bold mr-4">{count}</h3>
        <img 
          src="/api/placeholder/120/120" 
          alt="Person working" 
          className="h-24"
        />
      </div>
    </div>
  );
};

// Task table component
const TaskTable = ({ tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-500">
            <th className="py-3 px-4">Task</th>
            <th className="py-3 px-4">Overdue</th>
            <th className="py-3 px-4">Timeline</th>
            <th className="py-3 px-4">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr 
              key={task.id} 
              className={`border-t border-gray-100 hover:bg-purple-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="py-4 px-4 font-medium">{task.name}</td>
              <td className="py-4 px-4 text-red-500">{task.overdue}</td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span>{task.progress}% Complete</span>
                </div>
              </td>
              <td className="py-4 px-4">{task.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main app component
const TaskTrackerApp = () => {
  // Count summary calculations
  const taskCounts = {
    done: 12,
    inProgress: 5,
    pending: 4,
    tasksLeft: 9
  };
  
  return (
    <div className="flex bg-purple-50 h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePage="progress" />
      
      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <SummaryCard 
            icon={<CheckIcon />} 
            title="Done" 
            count={taskCounts.done} 
            color="bg-green-100 text-green-500"
          />
          <SummaryCard 
            icon={<CircleCheckIcon />} 
            title="In Progress" 
            count={taskCounts.inProgress} 
            color="bg-yellow-100 text-yellow-500"
          />
          <SummaryCard 
            icon={<ClockIcon />} 
            title="Pending" 
            count={taskCounts.pending} 
            color="bg-orange-100 text-orange-500"
          />
          <TasksLeftCard count={taskCounts.tasksLeft} />
        </div>
        
        {/* Task table */}
        <TaskTable tasks={taskData} />
      </div>
    </div>
  );
};

// Icon components (simple SVG icons)
const BoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CircleCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default TaskTrackerApp;