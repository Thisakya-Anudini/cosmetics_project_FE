import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import toast from "react-hot-toast";
import axios from "axios";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    // Validation
    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/contact",  // Update with your backend endpoint
        { name, email, subject, message }
      );

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center shadow-lg bg-[url('/co.jpeg')] bg-cover bg-center">
      <div className="w-full md:w-[750px]  h-[250px] bg-gray-800 shadow-2xl p-1 rounded-sm border border-neutral-800 shadow-2xl flex flex-col justify-center ">
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-50 text-center mb-3">Contact Us</h1>

        {/* Contact Details */}
        <div className="space-y-1 text-md text-blue-50">
          {/* Phone */}
          <div className="flex items-center justify-center space-x-5">
            <FaPhoneAlt className="text-3xl text-green-500" />
            <p className="font-medium">+9478323538</p>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center space-x-5">
            <FaEnvelope className="text-3xl text-gray-400" />
            <p className="font-medium">thisakyaanudini@gmail.com</p>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center space-x-5">
            <FaMapMarkerAlt className="text-3xl text-red-600" />
            <p className="font-medium">No.50, Main Street, Colombo, Sri Lanka</p>
          </div>

          {/* Social Media Links */}
          <div className="text-md text-center">
            <p className="font-semibold mb-3 mt-2">Follow Us:</p>
            <ul className="flex justify-center space-x-6">
              <li>
                <a 
                  href="https://www.linkedin.com/in/thisakya-anudini/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                >
                  <FaLinkedin className="text-3xl text-blue-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/1QnduxXYPp/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                >
                  <FaFacebook className="text-3xl text-blue-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/thisakya_anudini?igsh=YWljdHQ4OTU2ZjF5" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                >
                  <FaInstagram className="text-3xl text-pink-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="md:w-[500px] w-full bg-black shadow-2xl p-6 rounded-sm mt-5 opacity-85 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Send Us a Message</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-md font-semibold text-white">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"  // Added text-white here
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-md font-semibold text-white">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"  // Added text-white here
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-md font-semibold text-white">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"  // Added text-white here
              placeholder="Enter subject"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-md font-semibold text-white">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"  // Added text-white here
              rows="6"
              placeholder="Your message"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-700 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
};

export default ContactUsPage;
