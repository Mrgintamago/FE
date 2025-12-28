import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const DEFAULT_MIN = 0;
// Nâng trần mặc định cao hơn để không vô tình lọc hết sản phẩm (đặc biệt pre-order giá cao)
const DEFAULT_MAX = 100000000000; // 100 tỷ

const formatNumber = (value) => {
  if (value === null || value === undefined) return "";
  const num = Number(value.toString().replace(/\D/g, ""));
  if (Number.isNaN(num)) return "";
  return num.toLocaleString("vi-VN");
};

const sanitizeNumber = (value) => {
  if (!value) return "";
  const num = Number(value.toString().replace(/\D/g, ""));
  return Number.isNaN(num) ? "" : num;
};

const FilterPrice = ({ onChange }) => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  const initial = useMemo(
    () => ({
      min: params.promotion_gte ? Number(params.promotion_gte) : DEFAULT_MIN,
      max: params.promotion_lte ? Number(params.promotion_lte) : DEFAULT_MAX,
    }),
    [location.search]
  );

  const [minInput, setMinInput] = useState(initial.min);
  const [maxInput, setMaxInput] = useState(initial.max);

  const handleApply = () => {
    if (!onChange) return;
    const minVal = sanitizeNumber(minInput);
    const maxVal = sanitizeNumber(maxInput);
    const payload = {
      promotion_gte: minVal === "" ? DEFAULT_MIN : minVal,
      promotion_lte: maxVal === "" ? DEFAULT_MAX : maxVal,
    };
    onChange(payload);
  };

  return (
    <div className="flex flex-col p-5 gap-y-3">
      <span className="font-semibold text-base">Chọn khoảng giá</span>
      <div className="flex items-center gap-x-2">
        <input
          type="text"
          inputMode="numeric"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          placeholder="Min"
          value={formatNumber(minInput)}
          onChange={(e) => setMinInput(sanitizeNumber(e.target.value))}
        />
        <span className="text-sm">-</span>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          placeholder="Max"
          value={formatNumber(maxInput)}
          onChange={(e) => setMaxInput(sanitizeNumber(e.target.value))}
        />
      </div>
      <button
        className="mt-2 bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
        onClick={handleApply}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default FilterPrice;
