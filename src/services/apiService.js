// // apiService.js - Service for handling API calls to Flask backend

// // Base URL for API requests
// const API_BASE_URL = 'http://localhost:5000/api';

// // Function to handle API responses
// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// };

// // API functions
// export const apiService = {
//   // Get user dashboard data
//   getUserDashboard: async (userId) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/dashboard`);
//     return handleResponse(response);
//   },
  
//   // Get user tasks
//   getUserTasks: async (userId) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/tasks`);
//     return handleResponse(response);
//   },
  
//   // Create a new task
//   createTask: async (userId, taskData) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/tasks`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(taskData),
//     });
//     return handleResponse(response);
//   },
  
//   // Update task status
//   updateTaskStatus: async (userId, taskId, status) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/tasks/${taskId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ status }),
//     });
//     return handleResponse(response);
//   },
  
//   // Get user progress
//   getUserProgress: async (userId) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/progress`);
//     return handleResponse(response);
//   },
  
//   // Get AI insights
//   getAIInsights: async (userId) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/insights`);
//     return handleResponse(response);
//   },
// };

// export default apiService;