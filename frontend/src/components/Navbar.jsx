import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Safely retrieve user data to prevent JSON parse errors
  const savedUser = localStorage.getItem("user");
  const user = (savedUser && savedUser !== "undefined") ? JSON.parse(savedUser) : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
        <Link to="/projects" className="hover:text-blue-200 transition">Projects</Link>
        <Link to="/ai" className="hover:text-blue-200 transition">AI</Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="text-yellow-300 font-bold hover:text-yellow-400 transition">
            👑 Admin Panel
          </Link>
        )}

        {user && (
          <span className="ml-4 bg-blue-700 px-3 py-1 rounded-full text-sm">
            {user.name} <span className="opacity-75">| {user.role === "admin" ? "Admin" : "User"}</span>
          </span>
        )}
      </div>

      {/* RIGHT SIDE */}
      <button 
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition font-medium"
      >
        Logout
      </button>
    </div>
  );
}