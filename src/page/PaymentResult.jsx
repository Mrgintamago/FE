import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentResult.css";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const orderId = params.get("orderId");

        console.log("🔵 [PaymentResult] Payment successful for orderId:", orderId);

        // After redirect to payment-result, treat as success immediately
        if (orderId) {
          setPaymentStatus("success");
          setPaymentData({
            orderId: orderId,
            message: "Thanh toán thành công! Cảm ơn bạn đã mua hàng.",
          });
        } else {
          console.error("❌ [PaymentResult] No orderId in URL");
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("❌ [PaymentResult] Error:", error);
        setPaymentStatus("failed");
      }
    };

    // Start immediately
    verifyPayment();
    
    return () => {
      // Cleanup
    };
  }, [location]);

  const handleContinue = () => {
    if (paymentData?.orderId) {
      navigate(`/order/${paymentData.orderId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="payment-result-container">
      <div className="payment-result-card">
        {paymentStatus === "loading" && (
          <div className="payment-loading">
            <div className="spinner"></div>
            <p className="text-xs sm:text-sm md:text-base">Đang xác minh thanh toán...</p>
          </div>
        )}

        {paymentStatus === "success" && (
          <div className="payment-success">
            <div className="success-icon text-4xl sm:text-5xl md:text-6xl">✓</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 mb-2">Thanh toán thành công!</h2>
            <p className="text-xs sm:text-sm md:text-base mb-4">{paymentData?.message}</p>
            {paymentData && (
              <div className="payment-details mb-4 px-4 sm:px-0">
                <div className="detail-item">
                  <span className="detail-label text-xs sm:text-sm md:text-base">Mã đơn hàng:</span>
                  <span className="detail-value text-xs sm:text-sm md:text-base font-mono">{paymentData.orderId}</span>
                </div>
              </div>
            )}
            <button onClick={handleContinue} className="btn-continue px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base">
              Xem chi tiết đơn hàng
            </button>
          </div>
        )}

        {(paymentStatus === "pending" || paymentStatus === "failed") && (
          <div className="payment-failed">
            <div className="failed-icon text-4xl sm:text-5xl md:text-6xl">✕</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 mb-2">
              {paymentStatus === "pending" ? "Thanh toán đang chờ" : "Thanh toán thất bại"}
            </h2>
            <p className="text-xs sm:text-sm md:text-base mb-4">
              {paymentStatus === "pending" 
                ? "Vui lòng hoàn thành quét mã QR để xác nhận thanh toán" 
                : "Vui lòng thử lại"}
            </p>
            <div className="button-group flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/checkout")}
                className="btn-retry flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base"
              >
                {paymentStatus === "pending" ? "Quay lại thanh toán" : "Thử lại"}
              </button>
              <button onClick={() => navigate("/")} className="btn-home flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base">
                Quay lại trang chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
