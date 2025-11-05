import { useState } from "react";
import { BiCart, BiSolidLogOutCircle } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdReviews, MdContactPhone } from "react-icons/md";
import { PiFlowerLotusFill } from "react-icons/pi";
import { FaShoppingCart, FaShopify } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Determine the current page based on the URL
  const currentPage = location.pathname;

  return (
    <header className="h-[100px] bg-accent flex justify-center items-center relative">
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]">
          <div className="h-full w-[350px] bg-white flex flex-col">
            <div className="w-full bg-accent h-[100px] flex pl-[45px] flex-row items-center gap-[20px]">
              <GiHamburgerMenu
                className="text-white text-4xl md:hidden"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <img
                className="w-[150px] h-[80px] object-cover cursor-pointer"
                src="/logo.png"
                alt="Logo"
              />
            </div>
            <div className="w-full h-full flex flex-col p-[45px] items-start gap-8">
              {/* Home Link */}
              <Link
                to="/home"
                onClick={() => setIsOpen(false)}
                className={`text-accent text-2xl flex flex-row items-center ${currentPage === "/home" ? "bg-pink-100 p-2 rounded-md" : ""}`}
              >
                <HiHome className="text-accent text-2xl mr-2" />
                Home
              </Link>

              {/* Products Link */}
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className={`text-accent text-2xl flex flex-row items-center ${currentPage === "/products" ? "bg-pink-100 p-2 rounded-md" : ""}`}
              >
                <FaShopify className="text-accent text-2xl mr-2" />
                Products
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className={`text-accent text-2xl flex flex-row items-center ${currentPage === "/cart" ? "bg-pink-100 p-2 rounded-md" : ""}`}
              >
                <FaShoppingCart className="text-accent text-2xl mr-2" />
                Cart
              </Link>

              {/* Reviews Link */}
              <Link
                to="/reviews"
                onClick={() => setIsOpen(false)}
                className={`text-accent text-2xl flex flex-row items-center ${currentPage === "/reviews" ? "bg-pink-100 p-2 rounded-md" : ""}`}
              >
                <MdReviews className="text-accent text-2xl mr-2" />
                Reviews
              </Link>

              {/* About Us Link */}
              <Link
                to="/about-us"
                onClick={() => setIsOpen(false)}
                className={`text-accent text-2xl flex flex-row items-center ${currentPage === "/about-us" ? "bg-pink-100 p-2 rounded-md" : ""}`}
              >
                <PiFlowerLotusFill className="text-accent text-2xl mr-2" />
                About Us
              </Link>

              {/* Contact Us Link */}
              <Link
                to="/contact-us"
                onClick={() => setIsOpen(false)}
                className={`text-accent text-2xl flex flex-row items-center ${currentPage === "/contact-us" ? "bg-pink-100 p-2 rounded-md" : ""}`}
              >
                <MdContactPhone className="text-accent text-2xl mr-2" />
                Contact Us
              </Link>

              {/* Logout Button */}
              {token && (
                <button
                  className="text-accent text-2xl flex flex-row items-center"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsOpen(false);
                    navigate("/login");
                  }}
                >
                  <BiSolidLogOutCircle className="text-accent text-3xl mr-1" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logo */}
      <img
        className="w-[150px] h-[80px] object-cover absolute md:left-[40px] cursor-pointer"
        src="/logo.png"
        alt="Logo"
      />

      {/* Hamburger Menu Icon for Mobile */}
      <GiHamburgerMenu
        className="text-white text-4xl absolute md:hidden left-[40px]"
        onClick={() => {
          setIsOpen(true);
        }}
      />

      {/* Desktop Links */}
      <div className="hidden w-full md:flex justify-center items-center relative">
        {/* Home Link */}
        <Link
          to="/home"
          className={`text-white text-xl mx-4 ${currentPage === "/home" ? "bg-pink-400 p-2 rounded-md" : ""}`}
        >
          Home
        </Link>

        {/* Products Link */}
        <Link
          to="/products"
          className={`text-white text-xl mx-4 ${currentPage === "/products" ? "bg-pink-400 p-2 rounded-md" : ""}`}
        >
          Products
        </Link>

        {/* Reviews Link */}
        <Link
          to="/reviews"
          className={`text-white text-xl mx-4 ${currentPage === "/reviews" ? "bg-pink-400 p-2 rounded-md" : ""}`}
        >
          Reviews
        </Link>

        {/* About Us Link */}
        <Link
          to="/about-us"
          className={`text-white text-xl mx-4 ${currentPage === "/about-us" ? "bg-pink-400 p-2 rounded-md" : ""}`}
        >
          About Us
        </Link>

        {/* Contact Us Link */}
        <Link
          to="/contact-us"
          className={`text-white text-xl mx-4 ${currentPage === "/contact-us" ? "bg-pink-400 p-2 rounded-md" : ""}`}
        >
          Contact Us
        </Link>

        {/* Cart Button */}
        <Link to="/cart">
          <BiCart className={`text-white text-3xl ml-4 ${currentPage === "/cart" ? "bg-pink-400  text-4xl p-1 rounded-sm" : ""}`} />
        </Link>

        {/* Logout Button (if logged in) */}
        {token && (
          <button
            className="absolute right-4 text-white text-xl ml-4"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
          Logout
          </button>
        )}
      </div>
    </header>
  );
}
