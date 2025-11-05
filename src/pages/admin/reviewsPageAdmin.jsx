import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews on page load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-gray-700">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customer Reviews</h1>

      <div className="space-y-6"> {/* Space between each review */}
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4"
          >
            {/* Review Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">{review.name}</h2>
              <div className="flex space-x-1">
                {/* Render Star Rating */}
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
