import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  // Initialize with 0s to prevent "undefined" errors on first render
  const [data, setData] = useState({ 
    total: 0, 
    completed: 0, 
    submitted: 0, 
    pending: 0, 
    overdue: 0 
  });

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch(() => console.log("Error fetching dashboard"));
  }, []);

  // --- LOGIC INTEGRATED ---
  const total = data.total || 0;
  const completed = data.completed || 0;

  // Only "Completed" moves the progress bar. 
  // With 1 Completed and 1 Submitted, this will result in 50%.
  const percent = total > 0 
    ? Math.round((completed / total) * 100) 
    : 0;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4 font-bold">Dashboard</h1>

        {/* UPDATED GRID TO SHOW SUBMITTED SEPARATELY */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-200 p-4 rounded shadow-sm">
            <p className="text-gray-600">Total</p>
            <p className="text-xl font-bold">{total}</p>
          </div>
          
          <div className="bg-green-200 p-4 rounded shadow-sm">
            <p className="text-green-800">Done</p>
            <p className="text-xl font-bold">{completed}</p>
          </div>

          <div className="bg-blue-200 p-4 rounded shadow-sm">
            <p className="text-blue-800">Submitted</p>
            <p className="text-xl font-bold">{data.submitted || 0}</p>
          </div>

          <div className="bg-yellow-200 p-4 rounded shadow-sm">
            <p className="text-yellow-800">Pending</p>
            <p className="text-xl font-bold">{data.pending}</p>
          </div>

          <div className="bg-red-200 p-4 rounded shadow-sm">
            <p className="text-red-800">Overdue</p>
            <p className="text-xl font-bold">{data.overdue || 0}</p>
          </div>
        </div>

        {/* ROGRESS BAR */}
        <div className="mt-8">
          <h2 className="mb-2 font-medium text-lg">Project Progress</h2>

          <div className="bg-gray-300 w-full h-5 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500 ease-in-out"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <p className="text-sm mt-2 font-semibold text-gray-700">
            {percent}% completed
          </p>
        </div>
      </div>
    </>
  );
}