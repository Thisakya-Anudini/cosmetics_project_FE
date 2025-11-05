import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaUser } from "react-icons/fa";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Registered Users</h1>
      <div className="grid gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
              {user.role === "admin" ? (
                <FaUserShield className="text-purple-600 text-2xl" />
              ) : (
                <FaUser className="text-gray-500 text-2xl" />
              )}
            </div>
            <p className="mt-2 text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="mt-2 text-gray-600"><strong>Role:</strong> {user.role}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}