import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
const InformationOrder = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = slugify(data?.product?.title, { strict: true });
    navigate(`/${path}/${data.id}`);
  };
  return (
    <div className="flex items-start justify-start px-5 gap-4 py-5">
      <div className="flex-shrink-0">
        <img
          src={data.product.images[0]}
          alt={data.product.title || "Product"}
          className="w-[80px] h-[80px] border-2 border-solid object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-1">
        <span
          className="text-sm line-clamp-2 hover:text-blue-800 cursor-pointer font-medium"
          onClick={handleClick}
          title={data.product.title}
        >
          {data.product.title}
        </span>
        <span className="text-sm text-[#a28faa]">
          Số lượng: {data.quantity}
        </span>
        <span className="text-base font-semibold text-blue-700">
          {formatPrice(data.product.promotion || data.product.price)}
        </span>
        {data.product.promotion && data.product.promotion < data.product.price && (
          <span className="text-sm text-[#a28faa] line-through">
            {formatPrice(data.product.price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default InformationOrder;
