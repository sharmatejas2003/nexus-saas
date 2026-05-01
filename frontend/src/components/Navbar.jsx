import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      
      {/* LEFT SIDE */}
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>

    

        <Link to="/ai">AI</Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="text-yellow-300 font-bold">
            Admin
          </Link>
        )}

        {user && (
          <span className="ml-4">
            {user.name} ({user.role === "admin" ? "👑 Admin" : "User"})
          </span>
        )}
      </div>

      {/* RIGHT SIDE */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}