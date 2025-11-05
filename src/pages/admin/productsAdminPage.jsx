import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);   // array of products
  const [isLoading, setIsLoading] = useState(true);  // loading state first time

  const navigate = useNavigate(); // page refresh smooth

  useEffect(() => { // get all products
    if (isLoading) { // if loading is happening, call the backend and get data
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products") // get all products
        .then((res) => {
          setProducts(res.data); // set products
          setIsLoading(false); // set loading to false because loading is done
        });
    }
  }, [isLoading]); // dependency array

  return (
    <div className="  w-full   border-gray-200 shadow-lg rounded-lg">
      {isLoading ? (
        <Loader />
      ) : (
        <table className="w-full table-auto border-collapse ">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="p-[10px] text-left text-sm font-semibold ">Image</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Product ID</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Name</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Price</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Labelled Price</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Category</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Stock</th>
              <th className="p-[10px] text-left text-sm font-semibold ">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-600">
            {products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-[10px]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-[50px] h-[50px] object-cover rounded-full shadow-md"
                  />
                </td>
                <td className="p-[10px]">{product.productId}</td>
                <td className="p-[10px]">{product.name}</td>
                <td className="p-[10px]">{product.price}</td>
                <td className="p-[10px]">{product.labelledPrice}</td>
                <td className="p-[10px]">{product.category}</td>
                <td className="p-[10px]">{product.stock}</td>
                <td className="p-[10px] flex flex-row justify-center items-center space-x-4">
                  <BiTrash
                    className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl cursor-pointer hover:bg-red-600 transition-colors"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (token == null) {
                        navigate("/login");
                        return;
                      }
                      axios
                        .delete(
                          import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((res) => {
                          console.log("Product deleted successfully");
                          console.log(res.data);
                          toast.success("Product deleted successfully");
                          setIsLoading(!isLoading); // page load after delete
                        })
                        .catch((error) => {
                          console.error("Error deleting product:", error);
                          toast.error("Failed to delete product");
                        });
                    }}
                  />

                  <BiEdit
                    onClick={() => {
                      navigate("/admin/updateProduct", {
                        state: product,
                      });
                    }}
                    className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl cursor-pointer hover:bg-blue-600 transition-colors"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link
        to={"/admin/newProduct"}
        className="fixed right-[60px] bottom-[60px] p-[15px] text-white bg-accent rounded-full shadow-2xl hover:bg-gray-700 transition-colors"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
