import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const sortOptions = [
  { value: "ratingsAverage,-ratingsQuantity", label: "Sản phẩm nổi bật" },
  { value: "promotion", label: "Giá: Tăng dần" },
  { value: "-promotion", label: "Giá: Giảm dần" },
  { value: "title", label: "Tên: A-Z" },
  { value: "-title", label: "Tên: Z-A" },
  { value: "createdAt", label: "Cũ nhất" },
  { value: "-createdAt", label: "Mới nhất" },
  { value: "-ratingsQuantity,-ratingsAverage", label: "Bán chạy nhất" },
  // Lọc nhanh theo Pre-order
  { value: "pre-order", label: "Chỉ hiển thị Pre-order" },
];

const FilterSort = ({ onChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const searchParams = queryString.parse(location.search);
  let searchSort = searchParams.sort;
  if (searchParams.productType === "pre-order") {
    searchSort = "pre-order";
  }
  if (searchSort === undefined) {
    searchSort = "ratingsAverage,-ratingsQuantity";
  }

  const [active, setActive] = useState(searchSort);

  // Get current label
  const currentLabel = sortOptions.find((opt) => opt.value === active)?.label || "Sắp xếp";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update active when URL changes
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.productType === "pre-order") {
      setActive("pre-order");
    } else {
      const newSort = parsed.sort || "promotion";
      setActive(newSort);
    }
  }, [location.search]);

  const handleSelect = (value) => {
    setActive(value);
    setIsOpen(false);
    onChange(value === "pre-order" ? "-createdAt" : value);

    const values = queryString.parse(location.search);
    const filters = {
      ...values,
      sort: value === "pre-order" ? "-createdAt" : value,
      page: 1,
    };

    // Khi chọn Pre-order thì gắn thêm productType, ngược lại bỏ đi
    if (value === "pre-order") {
      filters.productType = "pre-order";
    } else {
      delete filters.productType;
    }

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-x-2 cursor-pointer py-2 px-4 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors min-w-[200px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m-9.75 4.5H12m-8.25-4.5h14.25m-14.25 0a.75.75 0 01.75-.75h12.5a.75.75 0 01.75.75m-14.25 0v.75a.75.75 0 01.75-.75h12.5a.75.75 0 01.75.75v.75m-9.75-4.5v.75a.75.75 0 01.75-.75h9.75a.75.75 0 01.75.75v.75"
          />
        </svg>
        <span className="flex-1">{currentLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-x-2 ${
                active === option.value ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {active === option.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
              <span className={`${active === option.value ? "font-semibold text-red-600" : ""}`}>
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSort;
