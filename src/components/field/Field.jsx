import React from "react";

const Field = ({ children }) => {
  return (
    <div className="flex flex-col items-start gap-y-2 w-full">
      {children}
    </div>
  );
};

export default Field;
