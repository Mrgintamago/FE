import React, { useEffect } from "react";
import { formatPrice } from "../../utils/formatPrice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cart/cartSlice";
import orderApi from "../../api/orderApi";
import axiosClient from "../../api/axiosClient";

const PaymentBank = () => {
  const dataOrder = JSON.parse(localStorage.getItem("order"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const paymentMethod = searchParams.get("method") || "payos";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Nếu không có order trong localStorage, redirect về trang chủ
    if (!localStorage.getItem("order")) {
      return navigate("/");
    }
  }, []);
  return (
    <div className="mt-10">
      <div className="container mx-auto  bg-white rounded-lg flex flex-col p-12 justify-between">
        <span className="text-2xl font-semibold mx-auto">
          Thông tin đơn hàng
        </span>
        <div className="flex flex-col w-[1000px] mx-auto mt-16 gap-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">Nguời nhận:</span>
            <span className="text-xl font-medium">{dataOrder?.receiver}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">Số điện thoại:</span>
            <span className="text-xl font-medium">{dataOrder?.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">Địa chỉ nhận hàng:</span>
            <span className="text-xl font-medium">{dataOrder?.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">Phương thức thanh toán:</span>
            <span className="text-xl font-medium">{dataOrder?.payments}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">
              Tổng số tiền cần thanh toán
            </span>
            <span className="text-2xl font-medium text-[#009245]">
              {formatPrice(dataOrder?.totalPrice)}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[800px] mt-10">
        {paymentMethod === "tiền mặt" ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">💵 Thanh toán tiền mặt</h2>
            <p className="text-gray-600 mb-6">Vui lòng thanh toán khi nhận hàng</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
              onClick={async () => {
                try {
                  const user = localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user"))
                    : null;

                  const data1 = {
                    address: dataOrder?.address,
                    phone: dataOrder?.phone,
                    receiver: dataOrder?.receiver,
                    email: dataOrder?.email || null,
                    cart: dataOrder?.cart,
                    totalPrice: dataOrder?.totalPrice,
                    payments: dataOrder?.payments || "tiền mặt",
                    coupon: dataOrder?.coupon || null,
                    discount: dataOrder?.discount || 0,
                    status: "Processed",
                  };

                  if (user) {
                    await orderApi.createOrder(data1);
                  } else {
                    await orderApi.createOrderGuest(data1);
                  }

                  Swal.fire(
                    "Đơn hàng đã được tạo!",
                    "Cảm ơn bạn đã mua hàng. Vui lòng thanh toán khi nhận hàng.",
                    "success"
                  );

                  dispatch(resetCart());
                  localStorage.removeItem("order");

                  // Redirect về trang quản lý đơn hàng nếu đã đăng nhập, nếu không thì về trang chủ
                  if (user) {
                    navigate("/account/orders");
                  } else {
                    navigate("/");
                  }
                } catch (error) {
                  console.log(error.message);
                  toast.dismiss();
                  toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
                }
              }}
            >
              Xác nhận đơn hàng
            </button>
          </div>
        ) : paymentMethod === "payos" ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">💳 Thanh toán PayOS</h2>
            <p className="text-gray-600 mb-6">Quét mã QR để thanh toán</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              onClick={async () => {
                try {
                  // Tạo order và lấy QR code từ PayOS
                  const orderData = {
                    address: dataOrder?.address,
                    phone: dataOrder?.phone,
                    receiver: dataOrder?.receiver,
                    email: dataOrder?.email || null,
                    cart: dataOrder?.cart,
                    totalPrice: dataOrder?.totalPrice,
                    payments: "payos",
                  };

                  const user = localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user"))
                    : null;

                  const orderResponse = await orderApi.createOrderGuest(
                    orderData
                  );

                  const orderId = orderResponse?._id || orderResponse?.data?._id;

                  if (!orderId) {
                    toast.error("Lỗi: Không thể tạo đơn hàng");
                    return;
                  }

                  // Gọi API PayOS tạo QR code
                  const payosData = await axiosClient.post(
                    "/api/v1/payment/payos",
                    { orderId }
                  );

                  console.log("PayOS response:", payosData);

                  if (payosData?.data?.checkoutUrl) {
                    // Redirect tới PayOS checkout page
                    window.location.href = payosData.data.checkoutUrl;
                  } else {
                    toast.error(
                      `Lỗi PayOS: ${payosData?.message || "Không thể tạo link thanh toán"}`
                    );
                    console.error("PayOS error response:", payosData);
                  }
                } catch (error) {
                  console.error("PayOS error:", error);
                  toast.error("Lỗi khi xử lý thanh toán PayOS");
                }
              }}
            >
              Tạo mã QR PayOS
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentBank;
