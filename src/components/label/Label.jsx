import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      className="text-gray-700 font-semibold text-sm sm:text-base cursor-pointer block mb-2"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
