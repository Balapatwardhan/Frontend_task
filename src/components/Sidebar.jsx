import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activePage }) => {
  return (
    <div className="w-64 bg-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">Task Tracker</h1>
      
      <nav className="flex flex-col space-y-4 flex-grow">
        <SidebarItem 
          to="/dashboard" 
          icon={<BoxIcon />} 
          text="Dashboard" 
          active={activePage === 'dashboard'} 
        />
        <SidebarItem 
          to="/tasks" 
          icon={<ChatIcon />} 
          text="Tasks" 
          active={activePage === 'tasks'} 
        />
        <SidebarItem 
          to="/progress" 
          icon={<ClockIcon />} 
          text="Progress" 
          active={activePage === 'progress'} 
        />
        <SidebarItem 
          to="/calendar" 
          icon={<CalendarIcon />} 
          text="Calender" 
          active={activePage === 'calendar'} 
        />
      </nav>
      
      {/* Logout button at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <SidebarItem 
          to="/login" 
          icon={<LogoutIcon />} 
          text="Logout" 
          active={false} 
        />
      </div>
    </div>
  );
};

// Sidebar item component that uses Link
const SidebarItem = ({ to, icon, text, active }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${active ? 'bg-purple-50' : ''}`}
    >
      <div className="mr-3 text-gray-700">{icon}</div>
      <span className={`text-gray-700 ${active ? 'font-medium' : ''}`}>{text}</span>
    </Link>
  );
};

// Icon components (custom SVG icons)
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

// Logout icon
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default Sidebar;