import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Icons
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople, IoSettings } from "react-icons/io5";
import { MdRateReview, MdContactMail, MdDashboard} from "react-icons/md";

// Pages
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";
import AdminReviewsPage from "./admin/reviewsPageAdmin";
import AdminContactPage from "./admin/contactPageAdmin";
import AdminUsersPage from "./admin/userPageAdmin";
import AdminDashboard from "./admin/dashboardAdmin";
import SettingsPage from "./admin/settingsPageAdmin";
import Loader from "../components/loader";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminValidated, setAdminValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.role === "admin") {
            setAdminValidated(true);
          } else {
            toast.error("You are not authorized");
            navigate("/login");
          }
        })
        .catch(() => {
          toast.error("You are not authorized");
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {adminValidated ? (
        <>
          {/* Sidebar */}
          <div className="w-[300px] h-full bg-accent text-white shadow-xl p-6 flex flex-col items-center gap-5">
			<div className="flex flex-row items-center mb-1">
				<img
                className="w-[150px] h-[80px] object-cover cursor-pointer"
                src="/logo.png"
                alt="Logo"
              />
			   <span className="text-3xl font-semibold mb-1 mx-2">Admin</span>
			</div>
         

            {/* Sidebar Links */}
            <Link
              to="/admin"
              className={`w-full flex items-center gap-6 p-2 text-lg mt-5  rounded-md ${
                location.pathname === "/admin" ? "bg-pink-400" : ""
              }`}
            >
              <MdDashboard size={24} /> Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`w-full flex items-center gap-6 p-2 text-lg  rounded-md ${
                location.pathname === "/admin/products" ? "bg-pink-400" : ""
              }`}
            >
              <FaBoxArchive size={24} /> Products
            </Link>
            <Link
              to="/admin/orders"
              className={`w-full flex items-center gap-6 p-2 text-lg  rounded-md ${
                location.pathname === "/admin/orders" ? "bg-pink-400" : ""
              }`}
            >
              <GiShoppingBag size={24} /> Orders
            </Link>
            <Link
              to="/admin/users"
              className={`w-full flex items-center gap-6 p-2 text-lg  rounded-md ${
                location.pathname === "/admin/users" ? "bg-pink-400" : ""
              }`}
            >
              <IoPeople size={24} /> Users
            </Link>
            <Link
              to="/admin/reviews"
              className={`w-full flex items-center gap-6 p-2 text-lg  rounded-md ${
                location.pathname === "/admin/reviews" ? "bg-pink-400" : ""
              }`}
            >
              <MdRateReview size={24} /> Reviews
            </Link>
            <Link
              to="/admin/contact"
              className={`w-full flex items-center gap-6 p-2 text-lg rounded-md ${
                location.pathname === "/admin/contact" ? "bg-pink-400" : ""
              }`}
            >
              <MdContactMail size={24} /> Contact Messages
            </Link>
            <Link
              to="/admin/settings"
              className={`w-full flex items-center gap-6 p-2 text-lg  rounded-md ${
                location.pathname === "/admin/settings" ? "bg-pink-400" : ""
              }`}
            >
              <IoSettings size={24} /> Settings
            </Link>

            {/* Logout Button */}
            <button
              className=" p-2 mt-15 text-white text-lg  rounded-md cursor-pointer "
              onClick={() => {
                localStorage.removeItem("token");
                toast.success("Logged out successfully");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="w-[calc(100%-300px)] h-full overflow-y-auto ">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/products" element={<ProductsAdminPage />} />
              <Route path="/newProduct" element={<AddProductPage />} />
              <Route path="/updateProduct" element={<UpdateProductPage />} />
              <Route path="/orders" element={<OrdersPageAdmin />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/reviews" element={<AdminReviewsPage />} />
              <Route path="/contact" element={<AdminContactPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
