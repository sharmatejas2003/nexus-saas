import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });

    // This part is critical for the "Admin" badge to show up
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful!");
    navigate("/dashboard"); // This moves you away from the login screen
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-80 rounded">
        <h2 className="text-xl mb-4 text-center font-semibold">Login</h2>

        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        No account?{" "}
        <Link to="/register" className="text-blue-500 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}