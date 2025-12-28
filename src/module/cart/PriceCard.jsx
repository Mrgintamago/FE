import React from "react";
import { formatPrice } from "../../utils/formatPrice";

const PriceCard = ({ data }) => {
  const price = data.product.promotion || data.product.price;
  const hasDiscount = data.product.promotion && data.product.promotion < data.product.price;
  
  return (
    <div className="flex flex-col items-end justify-center">
      <span className="text-base font-semibold">
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm line-through">
          {formatPrice(data.product.price)}
        </span>
      )}
    </div>
  );
};

export default PriceCard;
