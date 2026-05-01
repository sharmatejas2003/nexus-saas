import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function AI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await API.post("/ai", { message });

      setChat((prev) => [
        ...prev,
        { role: "user", text: message },
        { role: "ai", text: res.data.reply }
      ]);

      setMessage("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "AI not working");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl mb-4 font-semibold">AI Assistant 🤖</h1>

        {/* CHAT BOX */}
        <div className="border p-4 h-80 overflow-y-auto mb-4 rounded bg-white">

          {chat.length === 0 && (
            <p className="text-gray-400 text-center">
              Start chatting with AI...
            </p>
          )}

          {chat.map((c, i) => (
            <div
              key={i}
              className={`mb-2 flex ${
                c.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  c.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {c.text}
              </div>
            </div>
          ))}

          {/* 🔥 LOADER INSIDE CHAT */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-2xl text-sm animate-pulse">
                🤖 AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <input
          className="border p-2 w-full rounded mb-2"
          value={message}
          placeholder="Ask something..."
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
        >
          Send
        </button>
      </div>
    </>
  );
}