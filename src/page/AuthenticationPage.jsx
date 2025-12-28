import React from "react";
import { Link } from "react-router-dom";

const AuthenticationPage = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-[1000px] w-full bg-white mx-auto mt-5 rounded-xl ${className}`}
    >
      <Link to="/">
        <div className="w-[150px] h-[120px] mx-auto flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      <div className="text-center">
        <div className="text-4xl font-bold">
          <span className="shop-name-green">Welcome to TQN Figure</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthenticationPage;
