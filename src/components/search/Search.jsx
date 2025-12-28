import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_status } from "../../utils/constants/status";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { useEffect } from "react";
import { getProductSearch } from "../../redux/product/productSlice";
import Skeleton from "../skeleton/Skeleton";

const Search = ({ onClickItem, keyword }) => {
  const { productSearch, statusSearch } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    const path = slugify(item.title, { strict: true });
    navigate(`/${path}/${item._id}`);
    onClickItem();
  };

  const handleViewMore = () => {
    localStorage.setItem("keyword", keyword);
    navigate(`/product/?keyword=${keyword}`);
    onClickItem();
  };

  useEffect(() => {
    if (keyword && keyword.trim().length > 0) {
    try {
        dispatch(getProductSearch(keyword.trim()));
    } catch (error) {
      console.log(error.message);
    }
    }
  }, [keyword, dispatch]);

  // Không hiển thị nếu không có keyword
  if (!keyword || keyword.trim().length === 0) {
    return null;
  }

  return (
    <div className="absolute top-14 left-0 w-full rounded-lg max-h-[500px] z-10 bg-white shadow-xl border border-gray-200 overflow-hidden">
      {statusSearch === action_status.LOADING && (
        <div className="flex flex-col p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 border-b border-dotted border-gray-300">
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
              <div className="flex flex-col justify-center flex-1 gap-2">
                <Skeleton className="w-3/4 h-4 rounded-md" />
                <Skeleton className="w-1/3 h-3 rounded-md" />
              </div>
            </div>
          ))}
          </div>
      )}
      {statusSearch === action_status.SUCCEEDED && (
        <div className="flex flex-col max-h-[500px] overflow-y-auto">
          {productSearch && productSearch.length > 0 ? (
            <>
              {productSearch.slice(0, 4).map((item) => (
              <div
                  className="flex items-center gap-4 p-4 border-b border-dotted border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleClick(item)}
                key={item._id}
              >
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-medium text-base text-gray-800 line-clamp-2 mb-1"
                    title={item?.title}
                  >
                    {item?.title}
                    </div>
                    <div className="font-semibold text-lg text-red-600">
                      {formatPrice(item?.promotion || item?.price)}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={item?.images?.[0] || "https://via.placeholder.com/80"}
                      alt={item?.title || "Product"}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                  </div>
                </div>
              ))}
              {productSearch.length > 4 && (
                <div
                  className="p-4 text-center border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleViewMore}
                >
                  <span className="text-gray-600 font-medium hover:text-red-600">
                    Xem thêm {productSearch.length - 4} sản phẩm
                  </span>
              </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <span className="text-base font-medium text-gray-500 mt-3">
                Không tìm thấy sản phẩm nào
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
