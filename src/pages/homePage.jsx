import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/productCard"; // Your ProductCard component
import Loader from "../components/loader"; // Your Loader component

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example featured product IDs (Replace these with actual IDs from your database)
  const featuredIds = ["P003", "P008", "P005", "P004"];

  useEffect(() => {
    const fetchFeatured = () => {
      const requests = featuredIds.map((id) =>
        axios.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${id}`)
      );

      Promise.all(requests)
        .then((responses) => {
          const products = responses.map((res) => res.data);
          setFeaturedProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching featured products:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchFeatured();
  }, []); // Only run once when the component is mounted

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-pink-200 to-pink-300 text-gray-900">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">
          Welcome to Anu Cosmetics
        </h1>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Discover our exclusive range of skincare and beauty products designed
          to enhance your natural beauty with elegance and affordability.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-500 transition duration-300 transform hover:scale-105"
        >
          Shop Now
        </button>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-12">
          Featured Products
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center">
            {featuredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section className="bg-pink-50 py-16 px-4 rounded-xl shadow-lg mb-16">
        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">About Us</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-8">
          At Anu Cosmetics, we believe beauty should be accessible to everyone.
          Our mission is to provide high-quality skincare products that cater to
          your unique beauty needs. Whether you're looking for daily essentials or
          something special, we have you covered.
        </p>
        <div className="text-center">
          <button
            onClick={() => navigate("/about-us")}
            className="bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-500 transition duration-300 transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
          {/* Customer 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <p className="text-lg text-gray-600 mb-4">
              "These products have completely transformed my skincare routine! My skin has never felt better."
            </p>
            <p className="text-lg font-semibold text-gray-900">Arushi Fernando</p>
          </div>

          {/* Customer 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <p className="text-lg text-gray-600 mb-4">
              "I can't get enough of the quality and results. Truly exceptional skincare!"
            </p>
            <p className="text-lg font-semibold text-gray-900">Sanjay Perera</p>
          </div>

          {/* Customer 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <p className="text-lg text-gray-600 mb-4">
              "Fast delivery and excellent customer service. Highly recommend!"
            </p>
            <p className="text-lg font-semibold text-gray-900">Lahiru Dias</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-pink-300 text-gray-800 font-semibold py-8">
        <div className="text-center">
          <p>&copy; 2025 Anu Cosmetics</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
