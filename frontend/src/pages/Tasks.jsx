import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const { id } = useParams(); // Project ID from URL
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null); // Context for AI
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch project details so the AI knows the project name
  const fetchProjectDetails = async () => {
    try {
      const res = await API.get(`/projects/${id}`); 
      setProject(res.data);
    } catch (err) {
      console.error("Error fetching project details", err);
    }
  };

  // ✅ Fetch tasks assigned to this project
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjectDetails();
  }, [id]);

  // ✅ Manual task creation
  const createTask = async () => {
    if (!title.trim()) return alert("Task title is required");
    try {
      const res = await API.post("/tasks", {
        title,
        project: id,
        status: "Pending"
      });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
    } catch (err) {
      alert("Error creating task");
    }
  };

  // ✅ Update status (Syncs with Dashboard progress)
  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks(); 
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // ✅ AI Generation using Bulk API to avoid 429 Rate Limits
  const generateTasksWithAI = async () => {
    try {
      setLoading(true);
      const res = await API.post("/ai", {
        message: "Generate 5 specific, short task titles for this project.",
        context: project?.name || "General Project" // Primary fix for generic AI answers
      });

      // Cleans numbering, dashes, and bolding (**) from AI response
      const tasksList = res.data.reply
        .split("\n")
        .map(t => t.replace(/^\d+\.\s*/, "").replace(/^[*-]\s*/, "").replace(/\*\*/g, "").trim())
        .filter(t => t.length > 0 && t.length < 100);

      // Save all tasks in ONE request
      await API.post("/tasks/bulk", { 
        tasks: tasksList, 
        project: id 
      });

      setLoading(false);
      fetchTasks();
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 429) {
        alert("AI Rate limit hit. Please wait 60 seconds.");
      } else {
        alert("AI failed to generate tasks.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">
            Tasks for: <span className="text-blue-600">{project?.name || "Loading..."}</span>
          </h1>
        </header>

        {/* Input Controls */}
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 flex-grow rounded shadow-sm"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createTask} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add
          </button>
          <button
            onClick={generateTasksWithAI}
            disabled={loading}
            className={`${loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"} text-white px-4 py-2 rounded transition-colors`}
          >
            {loading ? "Generating..." : "🤖 AI Generate"}
          </button>
        </div>

        {/* List Display */}
        <div className="space-y-3">
          {tasks.map((t) => (
            <div key={t._id} className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
              <span className="font-medium text-gray-800">{t.title}</span>
              <select
                value={t.status}
                onChange={(e) => updateStatus(t._id, e.target.value)}
                className="border rounded p-1 text-sm bg-gray-50 cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}