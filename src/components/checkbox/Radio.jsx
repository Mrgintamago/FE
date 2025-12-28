import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-2 sm:gap-x-3 font-medium cursor-pointer text-xs sm:text-sm md:text-base">
        <div
          className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border flex items-center justify-center p-0.5 sm:p-1 ${
            checked
              ? "bg-[#1DC071] border-[#1DC071] text-white"
              : "border-gray-200 text-transparent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
