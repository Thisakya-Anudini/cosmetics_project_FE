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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Using .then() and .catch() instead of async/await
    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/contact`,  // Make sure the URL is correct
      { name, email, subject, message }
    )
    .then((response) => {
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center shadow-lg bg-[url('/co.jpeg')] bg-cover bg-center">
      <div className="w-full md:w-[500px]  h-[400px] bg-gray-800 shadow-2xl  rounded-sm border border-neutral-800 shadow-2xl flex flex-col justify-center ">
        {/* Title */}
        <h1 className="text-3xl  font-bold text-blue-50 text-center mb-3">Contact Us</h1>

        {/* Contact Details */}
        <div className="space-y-0 text-md text-blue-50">
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

          {/* Google Map */}
          <div className="w-[330px] h-[150px] mt-3 mx-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63706472777!2d79.70030497171875!3d6.921813274929139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1762269632076!5m2!1sen!2slk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Social Media Links */}
          <div className="text-md text-center mt-3">
            <p className="font-semibold mb-2 ">Follow Us:</p>
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
      <div className="md:w-[500px] w-full bg-indigo-950 shadow-2xl p-10 rounded-sm mt-5 transparent-[50px] rounded-xl opacity-90">
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
            className="w-full py-2 px-6 bg-pink-600 text-white text-lg rounded-lg hover:bg-pink-400 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
};

export default ContactUsPage;
