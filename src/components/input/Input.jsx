import React from "react";
import { useController } from "react-hook-form";

const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <div className="relative w-full">
      <input
        type={type}
        id={name}
        {...props}
        {...field}
        className={`w-full border-[1px] border-solid border-[#292D32] rounded-[6px] sm:rounded-[8px] transition-all text-[#171725] font-medium text-xs sm:text-sm md:text-base ${
          children ? "py-2 sm:py-3 md:py-3.5 pr-8 sm:pr-10 md:pr-10 pl-3 sm:pl-4 md:pl-5" : "px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3.5"
        }`}
      />
      {children ? (
        <div className="absolute right-2 sm:right-3 md:right-4 top-[50%] -translate-y-[50%] cursor-pointer text-gray-500">
          {children}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
