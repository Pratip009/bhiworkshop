import { useEffect, useState } from "react";

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://bhiworkshop-1.onrender.com/contact",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      const sorted = [...data].sort((a, b) => a.read - b.read); // unread first
      setMessages(sorted);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await fetch(`https://bhiworkshop-1.onrender.com/contact/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchMessages();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Messages</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-50 align-top">
                  <td className="py-2 px-4 border-b">
                    {!msg.read && (
                      <span className="h-3 w-3 bg-green-500 rounded-full inline-block"></span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{msg.name}</td>
                  <td className="py-2 px-4 border-b">{msg.email}</td>
                  <td className="py-2 px-4 border-b">{msg.phone}</td>
                  <td className="py-2 px-4 border-b max-w-xs">
                    <div>
                      <span>
                        {expanded === msg._id
                          ? msg.message
                          : msg.message.length > 100
                          ? `${msg.message.slice(0, 100)}...`
                          : msg.message}
                      </span>
                      {msg.message.length > 100 && (
                        <button
                          onClick={() => toggleExpand(msg._id)}
                          className="text-blue-500 ml-2 text-sm"
                        >
                          {expanded === msg._id ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {!msg.read && (
                      <button
                        onClick={() => handleMarkAsRead(msg._id)}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserMessages;
