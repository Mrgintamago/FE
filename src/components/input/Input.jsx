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
        className={`w-full border-2 border-gray-300 rounded-lg transition-all duration-200 text-gray-900 font-medium text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-[#1DC071] focus:ring-2 focus:ring-[#1DC071]/20 ${
          children ? "py-3 pr-10 pl-4" : "px-4 py-3"
        } hover:border-gray-400`}
      />
      {children ? (
        <div className="absolute right-3 top-[50%] -translate-y-[50%] cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
          {children}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
