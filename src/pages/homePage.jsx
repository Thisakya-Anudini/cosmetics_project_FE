import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/productCard"; // Use your own ProductCard component
import Loader from "../components/loader"; // Your Loader component

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example featured product IDs (Replace these with actual IDs from your database)
  const featuredIds = ["P003", "P008", "P006", "P004"];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const requests = featuredIds.map((id) =>
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${id}`)
        );
        const responses = await Promise.all(requests);
        const products = responses.map((res) => res.data);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []); // Run once on component mount

  return (
    <div className="py-16 px-4 bg-gray-50">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-bold text-gray-800">Welcome to Anu Cosmetics</h1>
        <p className="mt-4 text-xl text-gray-600">
          Explore our exclusive collection of skincare and beauty products at unbeatable prices!
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/products")}
            className="bg-rose-400 text-black py-3 px-6 rounded-lg hover:bg-amber-500 transition duration-300 font-semibold"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Featured Products</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="m-8 ml-13 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section className="mt-16 bg-blue-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800">About Us</h2>
        <p className="mt-4 text-xl text-center text-gray-600">
          At Anu Cosmetics, we believe that beauty should be accessible to everyone. Our mission is to
          provide high-quality, skincare products at affordable prices. Whether you're looking for daily care or
          something special, we’ve got you covered.
        </p>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/about-us")}
            className="bg-rose-400 text-black py-3 px-6 rounded-lg hover:bg-amber-500 transition duration-300 font-semibold"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800">What Our Customers Say</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl text-gray-600">"The products have truly transformed my skin. Highly recommend!"</p>
            <p className="mt-4 text-lg font-semibold text-gray-800">Nina Perera</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl text-gray-600">"Amazing quality and exceptional customer service!"</p>
            <p className="mt-4 text-lg font-semibold text-gray-800">Ravindra Silva</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl text-gray-600">"I can see visible results in just a few days. Very pleased!"</p>
            <p className="mt-4 text-lg font-semibold text-gray-800">Anjali Kumar</p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default HomePage;
