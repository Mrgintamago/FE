import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownSelect = ({
  control,
  setValue,
  name,
  data,
  dropdownLabel = "Chọn",
  onClick = () => {},
  searchable = false,
}) => {
  const [label, setLabel] = useState(dropdownLabel);
  const [searchTerm, setSearchTerm] = useState("");
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: name,
  });

  // Filter data based on search term
  const filteredData = searchable && searchTerm
    ? data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    onClick(e.target.dataset.key);
    setLabel(e.target.textContent);
    setSearchTerm(""); // Reset search when item is selected
  };

  useEffect(() => {
    if (dropdownValue && dropdownValue !== "Chọn") {
      setLabel(dropdownValue);
    } else if (!dropdownValue || dropdownValue === "Chọn") {
      setLabel(dropdownLabel);
    }
  }, [dropdownValue, dropdownLabel]);

  useEffect(() => {
    if (!show) {
      setSearchTerm(""); // Reset search when dropdown closes
    }
  }, [show]);

  return (
    <div className="relative w-[300px]" ref={nodeRef}>
      <div
        className="p-3 rounded-lg border border-black bg-white flex items-center justify-between cursor-pointer border-solid"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-5 h-5 transition-transform ${show ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-lg bg-white z-40 ${
          show ? "shadow-lg border border-gray-200" : "opacity-0 invisible"
        }`}
      >
        {searchable && (
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white z-10">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => {
                e.stopPropagation();
                setSearchTerm(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredData.length > 0) {
                  const firstItem = filteredData[0];
                  setValue(name, firstItem.name);
                  setShow(false);
                  onClick(firstItem.code);
                  setLabel(firstItem.name);
                  setSearchTerm("");
                }
              }}
            />
          </div>
        )}
        <div className={`overflow-y-auto ${searchable ? "max-h-[200px]" : "h-[180px]"}`}>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item) => (
            <div
                className="p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleClickDropdownItem}
              data-value={item.name}
              data-key={item.code}
              key={item.name}
            >
              {item.name}
            </div>
            ))
          ) : (
            <div className="p-3 text-gray-500 text-center text-sm">
              {searchable && searchTerm ? "Không tìm thấy" : "Không có dữ liệu"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;
