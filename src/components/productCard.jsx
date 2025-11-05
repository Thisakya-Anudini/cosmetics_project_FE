import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productId}
      state={product}
      className="w-[300px] h-[400px] shadow-lg shrink-0 rounded-2xl mt-[40px] flex flex-col overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <img src={product.images[0]} className="w-full h-[300px] object-cover rounded-t-lg" />

      {/* Product Details */}
      <div className="w-full h-[100px] flex flex-col p-[8px] bg-slate-100 rounded-b-2xl">
        <span className="text-gray-500 text-[10px]">{product.productId}</span>

        <h1 className="text-2xl font-medium text-gray-800 ">
          {product.name}
          <span className="text-gray-500 text-[10px]">{"   |  "}{product.category}</span>
        </h1>

        {/* Price Section */}
        <div className="mt-2 flex flex-col">
          {product.labelledPrice > product.price ? (
            <div className="flex items-center">
              <span className="line-through mr-[10px] text-red-600 text-[16px] font-semibold">
                {product.labelledPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-emerald-500 font-semibold text-[20px]">
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-black font-semibold text-[20px]">
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
