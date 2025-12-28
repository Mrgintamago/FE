import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const BestSellerItem = ({ product, onClickItem, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const path = slugify(product.title, { strict: true });
    navigate(`/${path}/${product._id}`);
    onClickItem?.();
  };

  return (
    <div
      className={`best-seller-card flex flex-col rounded-lg p-3 bg-white h-full mx-2 cursor-pointer relative ${className}`}
      onClick={handleClick}
    >
      {product?.productType === "pre-order" && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
          Pre-order
        </div>
      )}

      {/* Image */}
      <div className="overflow-hidden rounded-lg mb-3 relative flex-1">
        <img
          src={
            product?.images[0] ||
            "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
          }
          alt={product?.title || "Product image"}
          className="product-image w-full h-[220px] sm:h-[240px] lg:h-[280px] object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Title only */}
      <h3 className="line-clamp-2 text-xs sm:text-sm font-medium text-gray-800 text-center">
        {product?.title}
      </h3>
    </div>
  );
};

export default BestSellerItem;
