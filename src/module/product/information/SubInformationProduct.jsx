import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/cart/cartSlice";
import { formatPrice } from "../../../utils/formatPrice";
import { toast } from "react-toastify";

const SubInformationProduct = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  
  // Parse tags từ string thành array (cách nhau bằng dấu phẩy)
  const productTags = data?.tags 
    ? (typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : Array.isArray(data.tags) ? data.tags : [])
    : [];
  
  // Nếu có nhiều hơn 1 tag thì hiển thị tags, nếu không thì hiện "Nguyên bản"
  const displayOptions = productTags.length > 1 
    ? productTags 
    : ["Nguyên bản"];
  
  // Set selectedOption mặc định
  const [selectedOption, setSelectedOption] = useState(
    productTags.length > 1 ? "" : "Nguyên bản"
  );

  // Lấy tên phân loại từ selectedOption
  const getSelectedOptionText = () => {
    if (productTags.length > 1) {
      // Nếu có tags, selectedOption là tên tag
      return selectedOption;
    } else {
      // Nếu không có tags, mặc định là "Nguyên bản"
      return "Nguyên bản";
    }
  };
  
  // Kiểm tra đã chọn phân loại chưa
  const isOptionSelected = selectedOption && selectedOption.trim() !== "";

  const handleAddCart = () => {
    if (!isOptionSelected) {
      toast.error("Vui lòng chọn phân loại sản phẩm");
      return;
    }
    const selectedOptionText = getSelectedOptionText();
    const action = addToCart({
      id: data._id,
      product: data,
      quantity: quantity,
      selectedOption: selectedOptionText, // Lưu phân loại đã chọn
    });
    dispatch(action);
  };

  const handleBuy = () => {
    if (!isOptionSelected) {
      toast.error("Vui lòng chọn phân loại sản phẩm");
      return;
    }
    const selectedOptionText = getSelectedOptionText();
    const action = addToCart({
      id: data._id,
      product: data,
      quantity: quantity,
      selectedOption: selectedOptionText, // Lưu phân loại đã chọn
    });
    dispatch(action);
    navigate("/cart");
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const isPreOrder = data?.productType === "pre-order";
  const depositAmount = data?.promotion ? Math.round(data.promotion * 0.25) : 0;

  // Share functionality
  const shareUrl = window.location.href;
  const shareTitle = data?.title || "";

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
        return;
      default:
        return;
    }
    
    if (shareLink) {
      const newWin = window.open(shareLink, "_blank", "width=600,height=600");
      // Nếu popup bị chặn, fallback copy link và báo
      if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }
    }
  };

  return (
    <div className="product-info flex flex-col p-4 sm:p-6">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3 line-clamp-2">
        {data?.title}
      </h1>

      {/* Status and Brand */}
      <div className="flex items-center gap-x-2 sm:gap-x-3 mb-4 flex-wrap text-xs sm:text-sm">
        <span className={`font-medium ${data?.inventory > 0 ? "text-red-600" : "text-orange-500"}`}>
          Tình trạng: {data?.inventory > 0 ? "Còn hàng" : "Hết hàng"}
        </span>
        <span className="text-gray-400">|</span>
        <span className={`font-medium ${isPreOrder ? "text-yellow-600" : "text-green-600"}`}>
          Loại: {isPreOrder ? "Pre-order" : "Có sẵn"}
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">
          TH: {data?.brand?.name || "N/A"}
        </span>
      </div>

      {/* Price */}
      <div className="mb-4 sm:mb-6">
        <span className="text-xs sm:text-sm text-gray-600 mb-2 block">Giá:</span>
        <div className="flex items-center gap-x-2 sm:gap-x-3 flex-wrap">
        <span className="text-2xl sm:text-3xl font-bold text-red-600">
          {formatPrice(data?.promotion || data?.price)}
        </span>
          {data?.promotion && data?.promotion < data?.price && (
            <>
              <span className="text-base sm:text-lg line-through text-slate-400">
                {formatPrice(data?.price)}
              </span>
              <span className="text-sm sm:text-base font-semibold text-blue-600">
                -{data?.percent || Math.round(((data.price - data.promotion) * 100) / data.price)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Options */}
      {displayOptions.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm text-gray-600 mb-2 block">Phân loại: <span className="text-red-500">*</span></span>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {displayOptions.map((option, index) => {
              // optionKey chính là tên option
              const optionKey = option;
              return (
                <button
                  key={index}
                  type="button"
                  className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-md border-2 transition-all ${
                    selectedOption === optionKey
                      ? "bg-gray-200 border-gray-400 font-semibold text-blue-600"
                      : "bg-white border-gray-300 hover:border-gray-400 text-blue-600"
                  }`}
                  onClick={() => setSelectedOption(optionKey)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {!isOptionSelected && (
            <p className="text-xs sm:text-sm text-red-500 mt-2">Vui lòng chọn phân loại</p>
          )}
        </div>
      )}

      {/* Quantity */}
      <div className="mb-4 sm:mb-6">
        <span className="text-xs sm:text-sm text-gray-600 mb-2 block">Số lượng:</span>
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <button
            className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm sm:text-lg"
            onClick={() => handleQuantityChange(-1)}
          >
            <span>-</span>
          </button>
          <span className="font-semibold w-10 sm:w-12 text-center text-sm sm:text-lg">{quantity}</span>
          <button
            className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm sm:text-lg"
            onClick={() => handleQuantityChange(1)}
          >
            <span>+</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      {data?.inventory > 0 && (
        <div className="mb-4 sm:mb-6">
          <div className="flex gap-x-2 sm:gap-x-3">
            <button
              className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                isOptionSelected
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
              type="button"
              onClick={handleAddCart}
              disabled={!isOptionSelected}
            >
              THÊM VÀO GIỎ
            </button>
            <button
              className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                isOptionSelected
                  ? "bg-blue-700 hover:bg-blue-800 cursor-pointer text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
              type="button"
              onClick={handleBuy}
              disabled={!isOptionSelected}
            >
              MUA NGAY
            </button>
          </div>
        </div>
      )}

      {/* Product Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        {isPreOrder && (
          <div className="flex items-center gap-x-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <span className="font-semibold text-gray-800">Flash PRE - ORDER</span>
          </div>
        )}
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-gray-800">{data?.title}</p>
          
          {/* Nhà cung cấp - Thương hiệu */}
          {(data?.category?.name || data?.brand?.name) && (
            <p className="text-gray-600">
              <span className="font-medium">
                {data?.category?.name && data?.brand?.name 
                  ? `${data.category.name} - ${data.brand.name}`
                  : data?.category?.name || data?.brand?.name}
              </span>
            </p>
          )}
          
          {/* Kích thước */}
          {(data?.height || data?.width || data?.depth) && (
            <p className="text-gray-600">
              <span className="font-medium">Kích thước:</span>{" "}
              {[
                data?.height && `H${data.height}`,
                data?.width && `W${data.width}`,
                data?.depth && `D${data.depth}`
              ].filter(Boolean).join(" x ")}
              {data?.height || data?.width || data?.depth ? "cm" : ""}
            </p>
          )}
          
          {/* Giới hạn */}
          {data?.inventory !== undefined && data?.inventory !== null && (
            <p className="text-gray-600">
              <span className="font-medium">Giới hạn:</span> {data.inventory} Bản
            </p>
          )}
          
          {/* Phát hành */}
          {data?.releaseDate && (
            <p className="text-gray-600">
              <span className="font-medium">Phát hành:</span> {data.releaseDate}
            </p>
          )}
          
          {/* Chất liệu */}
          {data?.material && (
            <p className="text-gray-600">
              <span className="font-medium">Chất liệu:</span> {data.material}
            </p>
          )}
          
          {/* Note (Description) */}
          {data?.description && (
            <div className="text-gray-600">
              <span className="font-medium">Note:</span>
              <div 
                className="mt-1 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Share and Stats Section */}
      <div className="mb-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center gap-x-4">
          <span className="text-sm font-medium text-gray-700">Chia sẻ:</span>
          <div className="flex gap-x-2">
            <button
              onClick={() => handleShare("facebook")}
              className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              title="Chia sẻ lên Facebook"
            >
              <span className="text-xs font-bold">f</span>
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white hover:bg-teal-600 transition-colors"
              title="Sao chép liên kết"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-x-6 text-sm text-gray-700">
          <span>Đã bán: {data?.sold || 0}</span>
          <span>Lượt xem: {data?.views || 0}</span>
        </div>
      </div>

      {copied && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white rounded-xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full border-4 border-green-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-10 h-10 text-green-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div className="text-base font-semibold text-gray-800">Đã sao chép URL</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SubInformationProduct;
