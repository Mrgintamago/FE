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
        <div style={{textAlign: "center", padding: "20px sm:padding-30px md:padding-40px"}}>
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
          <div style={{textAlign: "center", padding: "40px"}}>
            <p style={{color: "#d32f2f", marginBottom: "20px"}}>❌ Không tìm thấy đơn hàng</p>
            <button 
              onClick={() => navigate("/cart")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
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

        <div className="checkout-content flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Cancelled Payment Alert */}
          {paymentCancelled && (
            <div style={{
              padding: "12px sm:padding-16px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "16px sm:marginBottom-20px",
              color: "#856404",
              fontSize: "13px sm:fontSize-14px md:fontSize-15px",
              lineHeight: "1.5",
              width: "100%"
            }}>
              ⚠️ Bạn đã hủy giao dịch PayOS. Vui lòng chọn phương thức thanh toán khác hoặc thử lại.
            </div>
          )}

          {/* Order Summary */}
          <div className="order-summary w-full lg:w-1/3">
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

          {/* Payment Method Selection */}
          <div className="payment-section w-full lg:w-2/3">
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
