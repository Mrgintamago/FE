import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
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
const Cart = () => {
  const product = JSON.parse(localStorage.getItem("cart"));

  let length = product?.length;
  let total = 0;
  if (length > 0) {
    total = product.reduce(
      (count, item) => count + item.quantity * item.product.promotion,
      0
    );
  }
  const navigate = useNavigate();

  return (
    <CartStyles className="cart-child">
      <div className="flex flex-col p-4 max-h-[450px] overflow-hidden">
        {/* Header */}
        <div className="pb-3 border-b border-gray-200 mb-3">
          <h3 className="text-lg font-bold text-gray-800">Giỏ hàng của bạn</h3>
          <p className="text-sm text-gray-500 mt-1">{length} sản phẩm</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-4 custom-scrollbar">
          {product?.length > 0 &&
            product.map((item) => <CartItem product={item} key={item.id} />)}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-gray-700">
              Tổng tiền:
            </span>
            <span className="text-xl font-bold text-[#1DC071]">
              {formatPrice(total)}
            </span>
          </div>
          <button
            className="w-full bg-gradient-to-r from-[#1DC071] to-[#a4d96c] text-white rounded-lg py-3 font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            type="button"
            onClick={() => navigate("/cart")}
          >
            Xem giỏ hàng
          </button>
        </div>
      </div>
    </CartStyles>
  );
};

export default Cart;
