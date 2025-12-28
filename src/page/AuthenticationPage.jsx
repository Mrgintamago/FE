import React from "react";
import { Link } from "react-router-dom";

const AuthenticationPage = ({ children, className = "", subtitle = "Đăng nhập để tiếp tục mua sắm" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-8 px-4">
      <div
        className={`max-w-[500px] w-full bg-white mx-auto rounded-2xl shadow-2xl ${className} transition-all duration-300 hover:shadow-3xl`}
        style={{
          boxShadow: "0 20px 60px rgba(29, 192, 113, 0.15), 0 0 0 1px rgba(29, 192, 113, 0.05)",
        }}
      >
        <div className="px-6 sm:px-8 pt-8 pb-4">
          <Link to="/" className="block group">
            <div className="w-[120px] h-[100px] mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="TQN Figure Logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </Link>
          <div className="text-center mt-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1DC071] to-[#a4d96c] bg-clip-text text-transparent">
              Welcome to TQN Figure
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="px-6 sm:px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
