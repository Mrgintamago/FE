import React, { useState } from "react";
import "./PaymentMethod.css";

const PaymentMethod = ({ selectedMethod, onMethodChange, totalPrice }) => {
  const paymentMethods = [
    {
      id: "tiền mặt",
      label: "Thanh toán khi nhận hàng",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
      icon: "💵",
    },
    {
      id: "payos",
      label: "PayOS",
      description: "Quét mã QR PayOS để thanh toán",
      icon: "📲",
    },
  ];

  return (
    <div className="payment-methods-container">
      <h3 className="payment-title">Chọn phương thức thanh toán</h3>

      <div className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-method-card ${
              selectedMethod === method.id ? "active" : ""
            }`}
            onClick={() => onMethodChange(method.id)}
          >
            <div className="payment-icon">{method.icon}</div>
            <h4 className="payment-label">{method.label}</h4>
            <p className="payment-description">{method.description}</p>
            <div className="payment-radio">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => onMethodChange(method.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="payment-info">
        <p>
          Tổng số tiền: <strong>{totalPrice?.toLocaleString("vi-VN")} ₫</strong>
        </p>
      </div>
    </div>
  );
};

export default PaymentMethod;
