import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // user details after taking token and decoding
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
      

    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setName(res.data.firstName + " " + res.data.lastName);
          console.log(user);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch user details");
          
        });
    }
  }, []);

  const [cart, setCart] = useState(location.state.items || []);
  if (location.state.items == null) {
    toast.error("Please select items to checkout");
    navigate("/products");
  }

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
    if (name === "" || address === "" || phone === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const order = {
      address: address,
      phone: phone,
      items: [],
      total: getTotal(),  
    };
    cart.forEach((item) => {
      order.items.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    });
    console.log("Placing order with:", order);

    try {
      
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order placed successfully");
      
    } catch (err) {
      console.error(err);

      toast.error("Failed to place order");
      return;
    }
  }

  console.log(cart);
  return (
    <div className="w-full max-w-[100vw] h-screen flex flex-col px-4 py-8 items-center bg-gray-50">
      {/* Cart Items */}
      {cart.map((item, index) => {
        return (
          <div
            key={item.productId}
            className="w-full md:w-[800px] h-[120px] m-4 shadow-lg flex flex-row items-center relative bg-white p-4 rounded-lg space-x-4"
          >
            {/* Product Image */}
            <div className="md:w-[120px] w-[100px] justify-center items-center flex flex-col text-2xl md:text-md">
              <img
                src={item.image}
                className="w-[80px] h-[80px] object-cover rounded-lg"
                alt={item.name}
              />
            </div>

            {/* Product Details */}
            <div className="w-[300px] h-full flex-col justify-center pl-[10px] flex">
              <span className="font-bold">{item.name}</span>
              
              <span className="font-semibold">
                {item.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Quantity Control */}
            <div className="w-[200px] h-full text-2xl flex flex-row justify-center items-center space-x-4">
              <button
                className="w-5 h-5 rounded-full bg-gray-400 text-black hover:bg-gray-500 flex justify-center items-center text-[27px] "
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity -= 1;
                  if (newCart[index].quantity <= 0) {
                    newCart.splice(index, 1);
                  }
                  setCart(newCart);
                }}
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button
                className="w-5 h-5 rounded-full bg-gray-400 text-black hover:bg-gray-500 flex justify-center items-center text-[20px]"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity += 1;
                  setCart(newCart);
                }}
              >
                +
              </button>
            </div>


            {/* Item Total */}
            <div className="w-[185px] text-lg h-full flex justify-end items-center pr-[10px]">
              <span className="font-semibold">
                {(item.quantity * item.price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Trash Icon (Remove Item) */}
            <button
              className="w-7 h-7 absolute top-0 right-0 mt-3 mr-3 bg-red-600 text-white rounded-full flex justify-center items-center hover:bg-red-400"
              onClick={() => {
                const newCart = [...cart];
                newCart.splice(index, 1);
                setCart(newCart);
              }}
            >
              <TbTrash className="text-lg" />
            </button>
          </div>
        );
      })}

      {/* Total and Place Order Button */}
      <div className="w-full md:w-[800px] p-4 shadow-lg flex justify-between items-center bg-white rounded-lg mb-4">
        <span className="font-bold text-3xl text-gray-800">
          Total:{" "}
          {getTotal().toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <button
          onClick={placeOrder}
          className="w-[200px] h-[50px] bg-pink-600 text-white rounded-lg hover:bg-pink-400 transition duration-300"
        >
          Place Order
        </button>
      </div>

      {/* User Info Form */}
      <div className="w-full md:w-[800px] p-4 shadow-lg flex flex-col md:flex-row items-center gap-4 bg-white rounded-lg">
        <input
          className="w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );  
  
}

