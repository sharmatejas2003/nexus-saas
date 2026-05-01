import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const banUser = async (id) => {
    await API.put(`/users/ban/${id}`);
    fetchUsers();
  };

  const unbanUser = async (id) => {
    await API.put(`/users/unban/${id}`);
    fetchUsers();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl mb-4">Admin Panel</h1>

        {users.map((u) => (
          <div key={u._id} className="border p-3 mb-2 flex justify-between">
            <span>{u.email} ({u.role})</span>

            {u.isBanned ? (
              <button
                onClick={() => unbanUser(u._id)}
                className="bg-green-500 text-white px-2"
              >
                Unban
              </button>
            ) : (
              <button
                onClick={() => banUser(u._id)}
                className="bg-red-500 text-white px-2"
              >
                Ban
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}