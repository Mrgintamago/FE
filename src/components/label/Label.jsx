import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      className="text-black font-semibold text-xs sm:text-sm md:text-base cursor-pointer block mb-1 sm:mb-1.5"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
