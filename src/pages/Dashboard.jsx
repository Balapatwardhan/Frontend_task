import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // State for user data and dashboard metrics
  const [userData, setUserData] = useState({
    name: 'John Doe',
    xp: 350,
    streak: 37,
    progress: 35,
    activityData: [
      { month: 'Jan', tasks: 20 },
      { month: 'Feb', tasks: 30 },
      { month: 'Mar', tasks: 15 },
      { month: 'Apr', tasks: 40 },
      { month: 'May', tasks: 25 },
      { month: 'Jun', tasks: 35 },
    ],
    aiInsights: [
      "You've spent 70% of your coding time this week on debugging—try breaking tasks into smaller steps.",
      "Your most productive hours are 10 AM–1 PM—schedule high-priority tasks then."
    ]
  });

  // Effect to fetch user data from backend
  useEffect(() => {
    // TODO: Replace with actual API call to Flask backend
    // fetchUserData()
    //   .then(data => setUserData(data))
    //   .catch(error => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar component - Adjusted height to ensure it remains visible */}
      <Sidebar className=" h-full min-h-screen" />
      
      {/* Main content */}
      <main className="flex-1 p-6 w-320">
        <h2 className="text-2xl font-bold mb-3">Dashboard</h2>
        
        {/* Header section with profile and welcome message */}
        <div className="bg-purple-700 rounded-lg p-6 mb-6 text-white flex items-center justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-2">Hello, {userData.name}</h2>
            <p className="text-white/90">
              Stay organized, boost your productivity, and never miss a deadline again! Task Tracker is designed to help you efficiently manage your tasks, track progress, and stay on top of your goals.
            </p>
          </div>
          <div className="hidden md:block">
            {/* Profile image placeholder */}
            <img 
              src="/api/placeholder/180/180" 
              alt="Profile" 
              className="rounded-full w-24 h-24 object-cover" 
            />
          </div>
        </div>
        
        {/* Dashboard metrics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Activity Chart */}
          <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Activity</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userData.activityData}>
                  <XAxis dataKey="month" />
                  <YAxis hide />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#9f7aea" 
                    strokeWidth={2} 
                    dot={{ fill: '#9f7aea', strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Progress Chart */}
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium mb-4">Progress</h3>
            {/* Circular progress indicator */}
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#e9d8fd" 
                  strokeWidth="10" 
                />
                {/* Progress circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#f97316" 
                  strokeWidth="10" 
                  strokeDasharray={`${userData.progress * 2.83} 283`} 
                  strokeDashoffset="0" 
                  strokeLinecap="round" 
                  transform="rotate(-90 50 50)" 
                />
                {/* Percentage text */}
                <text 
                  x="50" 
                  y="55" 
                  textAnchor="middle" 
                  fontSize="20" 
                  fontWeight="bold" 
                  fill="#374151"
                >
                  {userData.progress}%
                </text>
              </svg>
            </div>
          </div>
          
          {/* XP and Streak - Added border for separation */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="bg-white rounded-lg p-4 mb-4 text-center border border-gray-300">
              <h3 className="text-lg font-medium mb-2">XP</h3>
              <p className="text-2xl font-bold">{userData.xp} pts</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center border border-gray-300">
              <h3 className="text-lg font-medium mb-2">Streak</h3>
              <div className="flex items-center justify-center">
                <span className="text-orange-500 mr-2">🔥</span>
                <p className="text-2xl font-bold">{userData.streak}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Insights Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium">AI Insights</h3>
            <span className="ml-2 text-yellow-400">💡</span>
          </div>
          
          <div className="space-y-4">
            {userData.aiInsights.map((insight, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow border border-purple-100"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
