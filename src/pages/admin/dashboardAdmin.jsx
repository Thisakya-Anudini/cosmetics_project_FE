import { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaUsers, FaStar, FaEnvelope } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    reviews: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [productsRes, ordersRes, usersRes, reviewsRes, contactsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products"),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", { headers }),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", { headers }),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews"),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/contact"),
        ]);

        setStats({
          products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
          orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
          users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          reviews: Array.isArray(reviewsRes.data) ? reviewsRes.data.length : 0,
          contacts: Array.isArray(contactsRes.data) ? contactsRes.data.length : 0,
        });
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
        setError("Failed to load stats. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardStyle =
    "bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-gray-700 ml-3">Loading dashboard stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className={cardStyle}>
        <FaBoxOpen className="text-4xl text-blue-500 mb-2" />
        <h2 className="text-xl font-bold">Products</h2>
        <p className="text-2xl">{stats.products}</p>
      </div>
      <div className={cardStyle}>
        <GiShoppingCart className="text-4xl text-green-500 mb-2" />
        <h2 className="text-xl font-bold">Orders</h2>
        <p className="text-2xl">{stats.orders}</p>
      </div>
      <div className={cardStyle}>
        <FaUsers className="text-4xl text-purple-500 mb-2" />
        <h2 className="text-xl font-bold">Users</h2>
        <p className="text-2xl">{stats.users}</p>
      </div>
      <div className={cardStyle}>
        <FaStar className="text-4xl text-yellow-500 mb-2" />
        <h2 className="text-xl font-bold">Reviews</h2>
        <p className="text-2xl">{stats.reviews}</p>
      </div>
      <div className={cardStyle}>
        <FaEnvelope className="text-4xl text-red-500 mb-2" />
        <h2 className="text-xl font-bold">Messages</h2>
        <p className="text-2xl">{stats.contacts}</p>
      </div>
    </div>
  );
}
