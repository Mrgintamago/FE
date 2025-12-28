import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";

const CartItem = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = slugify(product.product.title, { strict: true });
    navigate(`/${path}/${product.id}`);
  };
  
  const itemTotal = product.quantity * product.product.promotion;
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="relative flex-shrink-0">
        <img
          src={product.product.images[0]}
          alt={product.product.title}
          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer transition-transform group-hover:scale-105"
          onClick={handleClick}
        />
        <div className="absolute -top-2 -right-2 bg-[#1DC071] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {product.quantity}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className="text-sm font-semibold text-gray-800 line-clamp-2 cursor-pointer hover:text-[#1DC071] transition-colors mb-1"
          title={product.product.title}
          onClick={handleClick}
        >
          {product.product.title}
        </h4>
        {product.selectedOption && (
          <p className="text-xs text-gray-600 mb-1">
            Phân loại: <span className="font-medium">{product.selectedOption}</span>
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-[#1DC071]">
            {formatPrice(product.product.promotion)}
          </span>
          {product.product.price > product.product.promotion && (
            <span className="text-xs line-through text-gray-400">
              {formatPrice(product.product.price)}
            </span>
          )}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Tổng: <span className="font-semibold text-gray-700">{formatPrice(itemTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
