import { Routes, Route } from "react-router-dom"; // ✅ Fixed incorrect import
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import TrackProgress from "../pages/TrackProgress";
import Calendar from "../pages/calender"; 
import React from "react";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/progress" element={<TrackProgress />} />
      {/* Uncomment below if Calendar is needed */}
      <Route path="/calendar" element={<Calendar />} />

    </Routes>
  );
}

export default AppRoutes;
