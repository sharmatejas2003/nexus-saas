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
      // Ensure we always set an array even if backend fails
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setProjects([]); // Set to empty array on error to prevent crash
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!name.trim()) return alert("Please enter a project name");

    try {
      setLoading(true);
      await API.post("/projects", {
        name,
        description: "Standard Project"
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

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

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
        <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

        {/* INPUT SECTION */}
        <div className="mb-8 flex gap-3 bg-white p-4 rounded-lg shadow-sm border">
          <input
            className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new project name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={createProject}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded font-semibold transition`}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 && !loading && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No projects yet. Start by creating one above! 🚀</p>
          </div>
        )}

        {/* PROJECT LIST - With Data Safety Check */}
        <div className="space-y-3">
          {Array.isArray(projects) && projects.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded-lg flex justify-between items-center bg-white hover:shadow-md transition group"
            >
              <div 
                className="cursor-pointer flex-1"
                onClick={() => navigate(`/tasks/${p._id}`)}
              >
                <h3 className="font-bold text-blue-600 group-hover:underline">{p.name}</h3>
                <p className="text-sm text-gray-500">Click to manage tasks</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  deleteProject(p._id);
                }}
                className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}