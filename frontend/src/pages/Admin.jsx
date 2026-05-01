import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  // Get current user from localStorage to check against the list
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  //  FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  // FETCH LOGS
  const fetchLogs = async () => {
    try {
      const res = await API.get("/admin/logs");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load logs");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  // ACTIONS
  const ban = async (id) => {
    await API.put(`/admin/ban/${id}`);
    fetchUsers();
    fetchLogs(); 
  };

  const unban = async (id) => {
    await API.put(`/admin/unban/${id}`);
    fetchUsers();
    fetchLogs();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await API.delete(`/admin/user/${id}`);
    fetchUsers();
    fetchLogs();
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
           Welcome to the Admin Panel
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-200 p-4 rounded shadow-sm">
            Total Users: {users.length}
          </div>

          <div className="bg-red-200 p-4 rounded shadow-sm">
            Banned: {users.filter(u => u.isBanned).length}
          </div>

          <div className="bg-green-200 p-4 rounded shadow-sm">
            Active: {users.filter(u => !u.isBanned).length}
          </div>
        </div>

        {/* USERS */}
        <h2 className="text-lg font-semibold mb-2">Manage Users</h2>

        {users.length === 0 && (
          <p className="text-gray-500">No users found</p>
        )}

        {users.map((u) => {
          // Check if this user in the list is the one currently logged in
          const isSelf = u._id === currentUser.id || u.email === currentUser.email;

          return (
            <div
              key={u._id}
              className="border p-3 mb-2 flex justify-between items-center bg-white rounded shadow-sm"
            >
              <div>
                <strong className={isSelf ? "text-blue-600" : ""}>
                  {u.name} {isSelf && "(You)"}
                </strong> ({u.role})
                {u.isBanned && <span className="ml-2 text-red-500 font-medium">🚫 Banned</span>}
              </div>

              <div className="flex gap-2">
                {!u.isBanned ? (
                  <button
                    disabled={isSelf}
                    onClick={() => ban(u._id)}
                    className={`${isSelf ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded transition-colors`}
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    onClick={() => unban(u._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
                  >
                    Unban
                  </button>
                )}

                <button
                  disabled={isSelf}
                  onClick={() => remove(u._id)}
                  className={`${isSelf ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} text-white px-3 py-1 rounded transition-colors`}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {/* LOGS SECTION */}
        <h2 className="mt-8 mb-2 font-semibold text-lg">📜 Activity Logs</h2>

        <div className="bg-gray-50 p-4 rounded border max-h-64 overflow-y-auto">
          {logs.length === 0 && (
            <p className="text-gray-400">No activity recorded yet</p>
          )}

          {logs.map((l) => (
            <div key={l._id} className="text-sm border-b py-2 last:border-0">
              <span className="font-medium text-blue-700">{l.action}</span> 
              <span className="text-gray-500"> by {l.user}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}