import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, MessageSquare, PieChart, Calendar } from "lucide-react";

const Sidebar = () => {
  return (
    <div className=" h-300 w-60 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-6">Task Tracker</h2>
      <nav className="space-y-4">
        <NavItem to="/dashboard" icon={<LayoutGrid size={20} />} label="Dashboard" />
        <NavItem to="/tasks" icon={<MessageSquare size={20} />} label="Tasks" />
        <NavItem to="/progress" icon={<PieChart size={20} />} label="Progress" />
        <NavItem to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
      </nav>
    </div>
  );
};

// ✅ Reusable Nav Item Component
const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 text-gray-700 hover:text-black transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Sidebar;
