import { useState } from "react";

function TrackProgress() {
  const [progress, setProgress] = useState([
    { task: "Complete React Project", status: "In Progress" },
    { task: "Prepare for Hackathon", status: "Not Started" },
    { task: "Submit Assignment", status: "Completed" },
  ]);

  const updateStatus = (index, newStatus) => {
    const updatedProgress = [...progress];
    updatedProgress[index].status = newStatus;
    setProgress(updatedProgress);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Track Progress</h2>
        <ul>
          {progress.map((item, index) => (
            <li key={index} className="border-b p-2 flex justify-between">
              <span>{item.task}</span>
              <select
                value={item.status}
                onChange={(e) => updateStatus(index, e.target.value)}
                className="border p-1"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrackProgress;
