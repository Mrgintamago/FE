import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const CartStyles = styled.div`
  width: 400px;
  position: absolute;
  top: 60px;
  right: 0;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &::before {
    content: "";
    width: 100%;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    transform: translateY(-100%);
  }
`;
const CartHollow = () => {
  const navigate = useNavigate();
  return (
    <CartStyles className="cart-child">
      <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Empty Cart Icon */}
          <div className="relative">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Giỏ hàng trống
            </h3>
            <p className="text-sm text-gray-500">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
          </div>
          
          <button
            className="bg-gradient-to-r from-[#1DC071] to-[#a4d96c] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            type="button"
            onClick={() => navigate("/")}
          >
            Mua sắm ngay
          </button>
        </div>
      </div>
    </CartStyles>
  );
};

export default CartHollow;
