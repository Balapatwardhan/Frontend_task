import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../components/Sidebar';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample Events (Each event appears ONLY on its start date)
  const events = {
    '2025-03-01': { title: 'React Project', category: 'Work', priority: 'High', start: '2025-03-01', deadline: '2025-03-03' },
    '2025-03-02': { title: 'Study Session', category: 'Education', priority: 'Medium', start: '2025-03-02', deadline: '2025-03-10' },
  };

  // Format Date Correctly
  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); // 'en-CA' ensures YYYY-MM-DD format
  };
  

  // Handle Date Click
  const handleDateClick = (newDate) => {
    setDate(newDate);
    setSelectedDate(formatDate(newDate));
  };

  // Calculate Remaining Days to Deadline
  const getRemainingDays = (deadline) => {
    const today = new Date();
    const end = new Date(deadline);
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      {/* 🏠 Sidebar */}
      <Sidebar />

      {/* 📌 Main Content */}
      <div className="flex flex-col w-full h-full p-6">

        {/* 🔹 Header */}
        <header className="w-full h-[10vh] bg-purple-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          📅 Calendar Page
        </header>

        {/* 🔹 Main Content Area (Calendar + Event Details) */}
        <div className="flex w-full h-[90vh] p-6 gap-6">

          {/* 📆 Calendar Section (65%) */}
          <div className="w-[65%] h-full bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Select a Date</h3>
            <div className="w-full flex justify-center items-center">
              <Calendar 
                onChange={handleDateClick} 
                value={date} 
                tileContent={({ date, view }) => {
                  const dateStr = formatDate(date);
                  return view === 'month' && events[dateStr] ? (
                    <p className="text-md font-bold text-purple-700 text-center">
                      {events[dateStr].title}
                    </p>
                  ) : null;
                }}
                className="react-calendar"
              />
            </div>
          </div>

          {/* 📜 Event Details Section (35%) */}
<div className="w-[35%] h-full bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
  <h3 className="text-2xl font-semibold text-gray-700 mb-6">📌 Event Details</h3>
  {selectedDate && events[selectedDate] ? (
    <div className="text-lg text-gray-800">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{events[selectedDate].title}</h2>
      <p className="text-xl"><strong>📌 Category:</strong> {events[selectedDate].category}</p>
      <p className="text-xl"><strong>⚡ Priority:</strong> {events[selectedDate].priority}</p>
      <p className="text-xl"><strong>📅 Start Date:</strong> {events[selectedDate].start}</p>
      <p className="text-xl"><strong>🚀 Deadline:</strong> {events[selectedDate].deadline}</p>

      {/* Remaining Days with Color Change */}
      <p className="text-xl font-bold" style={{ color: getRemainingDays(events[selectedDate].deadline) < 5 ? 'red' : 'black' }}>
        ⏳ Only {getRemainingDays(events[selectedDate].deadline)} days remaining!
      </p>
    </div>
  ) : (
    <p className="text-gray-500 text-lg">No events for this day.</p>
  )}
</div>


        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
