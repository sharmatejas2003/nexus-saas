import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!name.trim()) return alert("Enter project name");

    try {
      setLoading(true);

      await API.post("/projects", {
        name,
        description: "Demo project"
      });

      setName("");
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Project creation failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE FUNCTION
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl mb-4">Projects</h1>

        {/* INPUT */}
        <div className="mb-4 flex gap-2">
          <input
            className="border p-2 flex-1"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={createProject}
            className="bg-blue-500 text-white px-4"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {/* EMPTY */}
        {projects.length === 0 && !loading && (
          <p className="text-gray-500">No projects yet 🚀</p>
        )}

        {/* PROJECT LIST */}
        {projects.map((p) => (
          <div
            key={p._id}
            className="border p-3 mb-2 flex justify-between items-center hover:bg-gray-100"
          >
            {/* CLICK → OPEN TASKS */}
            <span
              className="cursor-pointer flex-1"
              onClick={() => navigate(`/tasks/${p._id}`)}
            >
              {p.name}
            </span>

            {/* DELETE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🔥 VERY IMPORTANT
                deleteProject(p._id);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}