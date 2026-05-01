import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

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
      adminSecret: "" // 🔥 reset when role changes
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
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-80">
        <h2 className="text-xl mb-4">Register</h2>

        {/* NAME */}
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {/* EMAIL */}
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* ROLE */}
        <select
          className="border p-2 mb-2 w-full"
          value={form.role}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        {/* ADMIN SECRET */}
        {form.role === "admin" && (
          <input
            className="border p-2 mb-2 w-full"
            placeholder="Enter Admin Secret"
            value={form.adminSecret}
            onChange={(e) =>
              handleChange("adminSecret", e.target.value)
            }
          />
        )}

        <button className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}