import { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelopeOpenText, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";

export default function AdminContactPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages on page load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/contact");
        setMessages(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch contact messages:", err);
        setError("Unable to fetch messages. Please try again later.");
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Mark a message as read
  const markAsRead = async (messageId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/mark-as-read/${messageId}`
      );
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg
        )
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    }
  };

  // Delete a message
  const deleteMessage = async (messageId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/delete/${messageId}`
      );
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // Display loader while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-gray-700 ml-3">Loading contact messages...</p>
      </div>
    );
  }

  // Display error if fetching fails
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Contact Messages</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 ease-in-out ${
              msg.isRead ? "border-l-4 border-green-500" : "border-l-4 border-pink-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{msg.name}</h2>
              <BiSolidMessageDetail className="text-pink-500 text-4xl" />
            </div>
            <p className="mt-2 text-gray-600"><strong>Email:</strong> {msg.email}</p>
            <p className="mt-2 text-gray-600"><strong>Subject:</strong> {msg.subject}</p>
            <p className="mt-4 text-gray-700">{msg.message}</p>

            <div className="mt-4 flex justify-between">
              {/* Mark as Read Button */}
              {!msg.isRead && (
                <button
                  onClick={() => markAsRead(msg._id)}
                  className="text-blue-500 flex items-center space-x-2"
                >
                  <FaCheckCircle className="text-blue-500" />
                  <span>Mark as Read</span>
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteMessage(msg._id)}
                className="text-red-700 flex items-center space-x-2"
              >
                <FaTrashAlt className="text-red-700" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
