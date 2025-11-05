import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loading) {
      if (query === "") {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
          .then((res) => {
            setProducts(res.data);
            setLoading(false);
          });
      } else {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
          .then((res) => {
            setProducts(res.data);
            setLoading(false);
          });
      }
    }
  }, [loading, query]);

  return (
    <div className="min-h-screen bg-white"> {/* Set the global background to white */}
      <div className="bg-pink-50 min-h-screen"> {/* Apply bg-pink-50 to the specific content area */}
        {/* Search Bar Section */}
        <div className="w-full h-[100px] flex justify-center items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLoading(true);
            }}
            className="w-[400px] h-[40px] border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Product Display Section */}
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
            {products.map((product) => {
              return <ProductCard key={product.productId} product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
