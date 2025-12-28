import React from "react";

const ColorFilter = ({ colors, selectedColors, onChange }) => {
  const handleColorClick = (colorName) => {
    const isSelected = selectedColors.includes(colorName);
    onChange(!isSelected, { name: colorName });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {colors.map((color) => {
        const isSelected = selectedColors.includes(color.name);
        return (
          <button
            key={color.id}
            onClick={() => handleColorClick(color.name)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              isSelected
                ? "border-blue-600 scale-110 shadow-lg"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{
              backgroundColor: color.hex,
              boxShadow: isSelected ? `0 0 0 2px white, 0 0 0 4px #2563eb` : "none",
            }}
            title={color.name}
          >
            {color.hex === "#FFFFFF" && (
              <div className="w-full h-full border border-gray-300 rounded-lg"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorFilter;

