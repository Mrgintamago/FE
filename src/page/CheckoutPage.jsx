import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import paymentApi from "../api/paymentApi";
import axiosClient from "../api/axiosClient";
import PaymentMethod from "../components/payment/PaymentMethod";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPayment, setSelectedPayment] = useState("tiền mặt");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [paymentCancelled, setPaymentCancelled] = useState(false);

  const orderId = searchParams.get("orderId");
  const isCancelled = searchParams.get("cancel") === "true" || searchParams.get("status") === "CANCELLED";
  const totalPrice = orderData?.totalPrice || 0;

  // Fetch order data from backend when orderId is in URL params
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        // Fallback to localStorage
        const localData = location.state?.orderData || 
                         JSON.parse(localStorage.getItem("orderData")) || {};
        setOrderData(localData);
        setPageLoading(false);
        return;
      }

      try {
        // Fetch order from backend using orderId
        const response = await axiosClient.get(`/api/v1/orders/${orderId}`);
        if (response.data && response.data.data) {
          setOrderData(response.data.data);
          if (isCancelled) {
            setPaymentCancelled(true);
          }
        } else {
          throw new Error("Không thể tải dữ liệu đơn hàng");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        // Fallback to localStorage
        const localData = location.state?.orderData || 
                         JSON.parse(localStorage.getItem("orderData")) || {};
        setOrderData(localData);
      } finally {
        setPageLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, isCancelled]);

  const handlePayment = async () => {
    if (!orderId) {
      setError("Không tìm thấy mã đơn hàng");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (selectedPayment === "tiền mặt") {
        // COD - Redirect to order detail
        navigate(`/order/${orderId}`, {
          state: { 
            message: "Đơn hàng được tạo thành công. Vui lòng thanh toán khi nhận hàng." 
          },
        });
      } else if (selectedPayment === "payos") {
        // PayOS payment
        const paymentResponse = await paymentApi.createPayOSPayment({
          orderId: orderId,
        });

        if (paymentResponse.data.checkoutUrl) {
          // Redirect tới PayOS checkout page
          window.location.href = paymentResponse.data.checkoutUrl;
        } else {
          throw new Error("Không thể tạo link thanh toán PayOS");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Lỗi xử lý thanh toán");
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="text-center px-5 sm:px-8 md:px-10 py-5 sm:py-8 md:py-10">
            <p className="text-xs sm:text-sm md:text-base">Đang tải dữ liệu đơn hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderId || !orderData || !totalPrice) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="text-center px-5 sm:px-8 md:px-10 py-10 sm:py-16 md:py-20">
            <p className="text-red-600 font-bold text-base sm:text-lg md:text-xl mb-5 sm:mb-6">❌ Không tìm thấy đơn hàng</p>
            <button 
              onClick={() => navigate("/cart")}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Quay lại giỏ hàng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Thanh toán đơn hàng</h1>

        {/* Cancelled Payment Alert */}
        {paymentCancelled && (
          <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-yellow-50 border-2 border-yellow-400 rounded mb-4 sm:mb-6 text-yellow-800 text-xs sm:text-sm md:text-base leading-relaxed w-full">
            ⚠️ Bạn đã hủy giao dịch PayOS. Vui lòng chọn phương thức thanh toán khác hoặc thử lại.
          </div>
        )}

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="order-summary w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
            <div className="summary-item">
              <span>Mã đơn hàng:</span>
              <span className="summary-value">{orderId}</span>
            </div>
            <div className="summary-item">
              <span>Tổng tiền:</span>
              <span className="summary-value">
                {totalPrice?.toLocaleString("vi-VN")} ₫
              </span>
            </div>
            <div className="summary-item">
              <span>Phí vận chuyển:</span>
              <span className="summary-value">Miễn phí</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-item total">
              <span>Tổng cộng:</span>
              <span className="summary-value">
                {totalPrice?.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>

          {/* Address Section */}
          <div className="address-section w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4">Thông tin giao hàng</h2>
            {orderData?.shippingAddress && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="summary-item">
                  <span className="font-semibold text-sm">Người nhận:</span>
                  <span className="text-sm">{orderData.shippingAddress.receiver}</span>
                </div>
                <div className="summary-item">
                  <span className="font-semibold text-sm">Điện thoại:</span>
                  <span className="text-sm">{orderData.shippingAddress.phone}</span>
                </div>
                <div className="summary-item">
                  <span className="font-semibold text-sm">Địa chỉ:</span>
                  <span className="text-sm">{orderData.shippingAddress.address}</span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="payment-section w-full">
            <PaymentMethod
              selectedMethod={selectedPayment}
              onMethodChange={setSelectedPayment}
              totalPrice={totalPrice}
            />

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="checkout-actions flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                className="btn-cancel flex-1 py-2 sm:py-3 px-4 text-xs sm:text-sm md:text-base"
                onClick={() => navigate("/cart")}
                disabled={loading}
              >
                Quay lại giỏ hàng
              </button>
              <button
                className="btn-pay flex-1 py-2 sm:py-3 px-4 text-xs sm:text-sm md:text-base"
                onClick={handlePayment}
                disabled={loading || !totalPrice}
              >
                {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
