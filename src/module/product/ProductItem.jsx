import React from "react";
import { formatPrice } from "../../utils/formatPrice";
const ProductItem = ({
  product,
  onClickItem,
  className = "",
}) => {
  // Kiểm tra giá sản phẩm có >= 800.000 không để hiển thị icon miễn phí giao hàng
  const productPrice = product?.promotion || product?.price || 0;
  const isFreeShipping = productPrice >= 800000;

  return (
    <div
      className={`product-card flex flex-col rounded-lg p-3 bg-white h-full mx-2 cursor-pointer relative ${className}`}
      onClick={onClickItem}
    >
      {product?.productType === "pre-order" && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
          Pre-order
        </div>
      )}
      {isFreeShipping && (
        <div className="absolute bottom-2 right-2 z-10 bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
          Freeship
        </div>
      )}
      <div className="overflow-hidden rounded-lg mb-2 relative">
        <img
          src={
            product?.images[0] ||
            "https://lh3.googleusercontent.com/ZQFbZeosDa1ODQnaaunB72fejXPcl_hg7rfEcgVlZSkgtOTAHQH1M4RxVrH2cLN6gjqJvOAq1b8CeE92gjqDN2W3b2HsMkxb=rw"
          }
          alt={product?.title || "Product image"}
          className="product-image w-full h-[220px] sm:h-[240px] lg:h-[280px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="line-clamp-2 mb-2 text-[10px] xs:text-xs sm:text-sm font-medium flex-1">
          {product?.title}
        </h3>
        {product?.inventory < 5 && product?.inventory > 0 && (
          <span className="text-orange-500 font-medium mb-1 text-xs sm:text-sm">
            Chỉ còn {product?.inventory}
          </span>
        )}
        {product?.inventory === 0 && (
          <span className="text-orange-500 font-medium mb-1 text-xs sm:text-sm">
            Hết hàng
          </span>
        )}
        <div className="flex flex-col gap-1 mt-auto">
          <span className="text-lg sm:text-xl lg:text-2xl text-red-600 font-bold break-words">
            {formatPrice(product?.promotion || product?.price)}
          </span>
          {product?.promotion && product?.promotion < product?.price ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm line-through text-slate-400">
                {formatPrice(product?.price)}
              </span>
              <span className="text-red-500 text-xs sm:text-sm font-semibold bg-red-50 px-2 py-0.5 rounded">
                -{product?.percent || 0}%
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
