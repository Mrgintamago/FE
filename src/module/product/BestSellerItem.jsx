import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { formatPrice } from "../../utils/formatPrice";

const BestSellerItem = ({ product, onClickItem, className = "" }) => {
  const navigate = useNavigate();
  const productPrice = product?.promotion || product?.price || 0;
  const isFreeShipping = productPrice >= 800000;
  const hasDiscount = product?.promotion && product?.promotion < product?.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.promotion) * 100) / product.price) : 0;

  const handleClick = () => {
    const path = slugify(product.title, { strict: true });
    navigate(`/${path}/${product._id}`);
    onClickItem?.();
  };

  return (
    <div
      className={`best-seller-card flex flex-col rounded-lg p-2 sm:p-3 bg-white cursor-pointer relative shadow-md hover:shadow-lg transition-shadow h-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] ${className}`}
      onClick={handleClick}
    >
      {product?.productType === "pre-order" && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-lg">
          Pre-order
        </div>
      )}
      
      {isFreeShipping && (
        <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-lg">
          Freeship
        </div>
      )}

      {/* Image - Fixed height to prevent overflow */}
      <div className="overflow-hidden rounded-lg mb-2 sm:mb-3 relative bg-gray-100 h-[120px] sm:h-[140px] md:h-[160px]">
        <img
          src={
            product?.images[0] ||
            "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
          }
          alt={product?.title || "Product image"}
          className="product-image w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Title - Always visible at bottom */}
      <div className="flex flex-col flex-1 min-h-0">
        <h3 className="line-clamp-2 text-[11px] xs:text-xs sm:text-sm font-medium text-gray-800 text-center px-1 mb-1">
          {product?.title}
        </h3>
      </div>
      
      {/* Price Section */}
      <div className="flex flex-col gap-1 mt-auto">
        {/* Main Price */}
        <p className="text-sm sm:text-base font-bold text-red-600 text-center px-1">
          {formatPrice(product?.promotion || product?.price)}
        </p>
        
        {/* Original Price + Discount */}
        {hasDiscount && (
          <div className="flex items-center justify-center gap-1 px-1">
            <span className="text-[10px] xs:text-xs line-through text-gray-400">
              {formatPrice(product?.price)}
            </span>
            <span className="text-[10px] xs:text-xs font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
              -{discountPercent}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellerItem;
