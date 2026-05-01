import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom"; // Added Link

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    adminSecret: ""
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      role: value,
      adminSecret: "" 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Registered successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-80 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h2>

        <input
          className="border p-2 mb-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          className="border p-2 mb-2 w-full rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <input
          type="password"
          className="border p-2 mb-2 w-full rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <select
          className="border p-2 mb-4 w-full rounded bg-white"
          value={form.role}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "admin" && (
          <input
            className="border p-2 mb-4 w-full rounded border-blue-300"
            placeholder="Enter Admin Secret"
            value={form.adminSecret}
            onChange={(e) => handleChange("adminSecret", e.target.value)}
          />
        )}

        <button className="bg-green-500 hover:bg-green-600 text-white p-2 w-full rounded font-bold transition">
          Register
        </button>

        {/* --- ADDED LOGIN LINK --- */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}