import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmPassword
  const navigate = useNavigate();

  // Register function
  function register() {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message || "Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration failed");
      });
  }

  return (
    <div className="w-full h-screen bg-[url(./1.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="w-[450px] h-[550px] backdrop-blur-lg shadow-2xl rounded-[30px] relative gap-[5px] text-white flex flex-col items-center justify-center">
        <h1 className="absolute top-[20px] text-3xl font-bold text-center my-0">Register</h1>

        {/* First Name */}
        <div className="w-[350px] flex flex-col mt-14">
          <span className="text-lg">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[350px] h-[40px] border border-gray-100 rounded-xl"
          />
        </div>

        {/* Last Name */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Last Name</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-[350px] h-[40px] border border-gray-100 rounded-xl"
          />
        </div>

        {/* Email */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[350px] h-[40px] border border-gray-100 rounded-xl"
          />
        </div>

        {/* Password */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[350px] h-[40px] border border-gray-100 rounded-xl"
          />
        </div>

        {/* Confirm Password */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[350px] h-[40px] border border-gray-100 rounded-xl"
          />
        </div>

        {/* Register Button */}
        <button
          onClick={register}
          className="w-[350px] h-[40px] bg-blue-700 rounded-xl text-white text-lg mt-6 hover:bg-blue-600 transition-all duration-300"
        >
          Register
        </button>

        {/* Login Link */}
        <p >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
