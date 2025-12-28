import React from "react";
import { formatPrice } from "../../utils/formatPrice";

const PriceCard = ({ data }) => {
  const price = data.product.promotion || data.product.price;
  const hasDiscount = data.product.promotion && data.product.promotion < data.product.price;
  
  return (
    <div className="flex flex-col items-end justify-center gap-1">
      <span className="text-base sm:text-lg font-bold text-red-600 break-words">
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className="text-xs sm:text-sm line-through text-slate-400">
          {formatPrice(data.product.price)}
        </span>
      )}
    </div>
  );
};

export default PriceCard;
