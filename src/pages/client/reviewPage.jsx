
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "T.A. Chandrasekara",
      rating: 5,
      text: "Great products, excellent quality! Will definitely shop again.",
    },
    {
      id: 2,
      name: "Chamath Madumal K",
      rating: 4,
      text: "Good service and fast delivery. I love the products!",
    },
    {
      id: 3,
      name: "K.H. Dilshan",
      rating: 5,
      text: "Absolutely love the designs. Quality is amazing for the price.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    text: "",
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

  const { name, rating, text } = formData;

  if (name && rating && text) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { name, rating: parseInt(rating), text }
      );

      // Add the new review to local state
      setReviews((prev) => [response.data.review, ...prev]);
      setFormData({ name: "", rating: 0, text: "" });
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  } else {
    toast.error("Please fill out all fields.");
  }
};

  return (
    <div className="py-16 px-4 bg-gray-50">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800">Customer Reviews</h1>
      <p className="mt-4 text-lg text-center text-gray-600">
        See what our customers are saying about our products and services!
      </p>

      {/* Reviews List */}
      <div className="mt-12 space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                <div className="flex mt-2">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.27l-3.767 2.364 1.001-4.322-3.287-2.858 4.347-.376L10 4.338l1.706 4.69 4.347.376-3.287 2.858 1.001 4.322L10 15.27z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-600">{review.rating} Stars</p>
            </div>
            <p className="mt-4 text-gray-600">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Add New Review Section */}
      <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Add Your Review</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Your Review</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your review"
              rows="4"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-400 transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewsPage;
