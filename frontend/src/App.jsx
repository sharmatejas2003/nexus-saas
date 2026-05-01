import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import AI from "./pages/AI";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import CreateTask from "./pages/CreateTask";

export default function App() {
  const token = localStorage.getItem("token");
  
  // Safe role check
  const getRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.role;
    } catch (e) {
      return null;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/projects"
          element={token ? <Projects /> : <Navigate to="/" />}
        />
        <Route
          path="/tasks/:id"
          element={token ? <Tasks /> : <Navigate to="/" />}
        />
        <Route
          path="/ai"
          element={token ? <AI /> : <Navigate to="/" />}
        />
        <Route 
          path="/create-task" 
          element={token ? <CreateTask /> : <Navigate to="/" />} 
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            token && getRole() === "admin" ? <Admin /> : <Navigate to="/" />
          }
        />

        {/* Catch-all to prevent blank pages on wrong URLs */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}