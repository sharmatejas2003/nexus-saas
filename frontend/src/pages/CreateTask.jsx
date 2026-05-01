import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function CreateTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    project: ""
  });

  const [projects, setProjects] = useState([]);

  // 🔥 Fetch projects for dropdown
  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 Create task
  const createTask = async () => {
    try {
      await API.post("/tasks", {
        ...form,
        status: "Pending" // ✅ FIXED STATUS
      });

      alert("Task Created ✅");
      setForm({ title: "", description: "", project: "" });

    } catch (err) {
      console.log(err);
      alert("Error creating task ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        {/* Title */}
        <input
          placeholder="Title"
          className="border p-2 mb-3 w-full"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="border p-2 mb-3 w-full"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        {/* Project Dropdown */}
        <select
          className="border p-2 mb-3 w-full"
          value={form.project}
          onChange={e => setForm({ ...form, project: e.target.value })}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={createTask}
          className="bg-green-500 text-white p-2 w-full"
        >
          Create Task
        </button>
      </div>
    </>
  );
}