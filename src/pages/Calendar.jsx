import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../components/Sidebar';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2)); // March 2025 as starting point
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Sample events data - expanded to include multiple months
  const events = {
    '2025-02-25': { title: 'Design Review', category: 'Work', priority: 'Medium', start: '2025-02-25', deadline: '2025-02-28' },
    '2025-03-01': { title: 'React Project', category: 'Work', priority: 'High', start: '2025-03-01', deadline: '2025-03-03' },
    '2025-03-02': { title: 'Study Session', category: 'Education', priority: 'Medium', start: '2025-03-02', deadline: '2025-03-10' },
    '2025-03-15': { title: 'Team Meeting', category: 'Work', priority: 'Low', start: '2025-03-15', deadline: '2025-03-15' },
    '2025-04-05': { title: 'Quarterly Review', category: 'Work', priority: 'High', start: '2025-04-05', deadline: '2025-04-10' },
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Navigate to next month
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Get current month and year as string
  const getCurrentMonthYear = () => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
  };

  // Handle date selection
  const handleDateClick = (day) => {
    const selectedDate = new Date(currentDate);
    selectedDate.setDate(day);
    const formattedDate = formatDate(selectedDate);
    
    if (events[formattedDate]) {
      setSelectedEvent(events[formattedDate]);
    } else {
      setSelectedEvent(null);
    }
  };

  // Days of the week
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  
  // Calculate days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Calculate first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Adjust for Monday as first day of week (convert Sunday from 0 to 7)
    const firstDayAdjusted = firstDay === 0 ? 7 : firstDay;
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 1; i < firstDayAdjusted; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }
    
    // Add calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateObj = new Date(year, month, i);
      const dateStr = formatDate(currentDateObj);
      const hasEvent = events[dateStr];
      const isSelected = selectedEvent && selectedEvent.start === dateStr;
      
      days.push(
        <div 
          key={i}
          className={`flex justify-center items-center aspect-square ${
            hasEvent ? 'cursor-pointer' : ''
          } ${isSelected ? 'border-2 border-red-500' : ''}`}
          onClick={() => handleDateClick(i)}
        >
          {hasEvent ? (
            <div className={`w-full h-full flex flex-col items-center justify-center rounded-md ${
              hasEvent.category === 'Work' ? 'bg-purple-500 text-white' : 'bg-purple-200'
            }`}>
              <span className="text-xl font-bold">
                {i}
              </span>
              <span className="text-sm font-bold">
                {hasEvent.title}
              </span>
              <span className="text-xs">
                {hasEvent.category}
              </span>
            </div>
          ) : (
            <span className="text-lg">
              {i}
            </span>
          )}
        </div>
      );
    }
    
    return days;
  };

  // Calculate remaining days to deadline
  const getRemainingDays = (deadline) => {
    const today = new Date(2025, 2, 1); // Using March 1, 2025 as "today" for the demo
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      {/* Sidebar */}
        
       <Sidebar/>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-purple-600 text-white flex items-center justify-center shadow-lg">
          <h1 className="text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar Page
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 flex gap-6">
          {/* Calendar */}
          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
              <button 
                className="p-2 hover:bg-gray-200 rounded-full" 
                onClick={prevMonth}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold">{getCurrentMonthYear()}</h2>
              <button 
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={nextMonth}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2 flex-1">
                {generateCalendarDays()}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="w-96 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h2 className="text-2xl font-bold">Event Details</h2>
            </div>
            
            {selectedEvent ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-600">{selectedEvent.title}</h3>
                
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Category: <span className="font-semibold">{selectedEvent.category}</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                  <span className="text-lg">Priority: <span className="font-semibold">{selectedEvent.priority}</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Start Date: <span className="font-semibold">{selectedEvent.start}</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Deadline: <span className="font-semibold">{selectedEvent.deadline}</span></span>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg font-bold text-red-500">Only {getRemainingDays(selectedEvent.deadline)} days remaining!</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg text-center">No events selected</p>
                <p className="text-sm text-center mt-2">Click on a date with an event to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;