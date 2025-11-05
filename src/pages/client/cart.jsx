import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
	const [cart, setCart] = useState(getCart());
	const navigate = useNavigate();
	console.log(cart);
return (
  <div className="w-[100vw] max-w-[100vw] h-screen flex flex-col px-4 py-[40px] items-center">
    {cart.map((item) => {
      return (
        <div
          key={item.productId}
          className="w-full md:w-[800px] h-[120px] m-[10px] shadow-2xl flex flex-row items-center relative bg-white p-4 rounded-lg space-x-4"
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
                addToCart(item, -1);
                setCart(getCart());
              }}
            >
              -
            </button>
            <span className="text-lg">{item.quantity}</span>
            <button
              className="w-5 h-5 rounded-full bg-gray-400 text-black hover:bg-gray-500 flex justify-center items-center text-[20px]"
              onClick={() => {
                addToCart(item, 1);
                setCart(getCart());
              }}
            >
              +
            </button>
          </div>

          {/* Item Total */}
          <div className="w-[190px] text-2xl md:text-md h-full flex justify-end items-center pr-[10px]">
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
              addToCart(item, -item.quantity);
              setCart(getCart());
            }}
          >
            <TbTrash className="text-lg" />
          </button>
        </div>
      );
    })}

    {/* Total and Checkout Button */}
    <div className="md:w-[800px] w-full h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
      <span className="font-bold text-2xl">
        Total:{" "}
        {getTotal().toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <button
        className="absolute left-[10px] w-[200px] text-2xl md:text-md md:w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-pink-600 border-[2px] border-pink-600 text-white hover:bg-white hover:text-pink-600"
        onClick={() => {
          navigate("/checkout", { state: { items: cart } });
        }}
      >
        Checkout
      </button>
    </div>
  </div>
);

}
