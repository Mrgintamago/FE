import React from "react";

const Field = ({ children }) => {
  return (
    <div className="flex flex-col items-start gap-y-2 sm:gap-y-3 mt-3 sm:mt-5 px-0">
      {children}
    </div>
  );
};

export default Field;
