import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { useSelector, useDispatch } from "react-redux";
import InformationOrder from "./InformationOrder";
import CartHidden from "../cart/CartHidden";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { resetCart } from "../../redux/cart/cartSlice";
import orderApi from "../../api/orderApi";
import { getAddress } from "../../redux/auth/addressSlice";
import UserAddress from "../UserProfile/UserAddress";
import ItemAddress from "../UserProfile/ItemAddress";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("tiền mặt");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [guestErrors, setGuestErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
  });
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  
  // Lấy địa chỉ mặc định
  const defaultAddress = address.filter((item) => item.setDefault === true)[0];
  
  // Lấy địa chỉ đã chọn hoặc địa chỉ mặc định
  const selectedAddress = selectedAddressId !== null
    ? address.find((item, index) => index === selectedAddressId)
    : defaultAddress;
  
  const data = selectedAddress || defaultAddress;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isLoggedIn = !!user;
  const subtotal = cart?.reduce(
    (count, item) => count + item.quantity * (item.product.promotion || item.product.price),
    0
  );
  
  // Tính phí vận chuyển: miễn phí nếu tổng đơn >= 800.000
  const shippingFee = subtotal >= 800000 ? 0 : 30000; // Phí ship 30.000 nếu < 800.000

  const validateField = (field, value) => {
    const v = value?.trim() || "";
    const phoneRegex = /^0\d{9,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (field) {
      case "name":
        if (!v) return "Vui lòng nhập họ tên";
        if (v.length < 3) return "Họ tên tối thiểu 3 ký tự";
        return "";
      case "phone":
        if (!v) return "Vui lòng nhập số điện thoại";
        if (!phoneRegex.test(v)) return "Số điện thoại không hợp lệ (10-11 số, bắt đầu bằng 0)";
        return "";
      case "email":
        if (!v) return "Vui lòng nhập email";
        if (!emailRegex.test(v)) return "Email không hợp lệ";
        return "";
      case "address":
        if (!v) return "Vui lòng nhập địa chỉ";
        if (v.length < 5) return "Địa chỉ phải có tối thiểu 5 ký tự";
        return "";
      default:
        return "";
    }
  };

  const validateGuestInfo = () => {
    const errors = {
      name: validateField("name", guestInfo.name),
      phone: validateField("phone", guestInfo.phone),
      email: validateField("email", guestInfo.email),
      address: validateField("address", guestInfo.address),
    };
    setGuestErrors(errors);
    setTouched({ name: true, phone: true, email: true, address: true });
    return !Object.values(errors).some((err) => err);
  };

  const handleFieldChange = (field, value) => {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setGuestErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, guestInfo[field]);
    setGuestErrors((prev) => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Load danh sách địa chỉ nếu đã đăng nhập
    if (isLoggedIn) {
      dispatch(getAddress());
    }
  }, [isLoggedIn, dispatch]);

  // Tự động chọn địa chỉ mặc định khi có địa chỉ
  useEffect(() => {
    if (isLoggedIn && address && address.length > 0) {
      if (selectedAddressId === null) {
        const defaultIndex = address.findIndex((item) => item.setDefault === true);
        if (defaultIndex !== -1) {
          setSelectedAddressId(defaultIndex);
        } else if (address.length > 0) {
          // Nếu không có địa chỉ mặc định, chọn địa chỉ đầu tiên
          setSelectedAddressId(0);
        }
      }
    }
  }, [address, isLoggedIn]);

  // Reload address list when edit modal closes
  useEffect(() => {
    if (editingAddressId === null && isLoggedIn && address.length > 0) {
      dispatch(getAddress());
    }
  }, [editingAddressId, isLoggedIn, address.length, dispatch]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleClick = async () => {
    // Lấy thông tin nhận hàng theo trạng thái đăng nhập
    let shippingInfo = null;

    if (isLoggedIn) {
      // Sử dụng địa chỉ đã chọn hoặc địa chỉ mặc định
      const addressToUse = selectedAddress || defaultAddress;
      
      if (!addressToUse) {
        toast.dismiss();
        toast.warning("Vui lòng thêm thông tin nhận hàng");
        return;
      }
      shippingInfo = {
        address: `${addressToUse?.detail}, ${addressToUse?.ward}, ${addressToUse?.province}${addressToUse?.country ? `, ${addressToUse?.country}` : ""}`,
        phone: addressToUse?.phone,
        receiver: addressToUse?.name,
      };
    } else {
      if (!validateGuestInfo()) {
        toast.dismiss();
        toast.warning("Vui lòng nhập đúng và đủ thông tin nhận hàng");
        return;
      }
      const { name, phone, email, address: addr } = guestInfo;
      shippingInfo = {
        address: addr.trim(),
        phone: phone.trim(),
        receiver: name.trim(),
        email: email.trim(),
      };
    }

    Swal.fire({
      title: "Thanh toán ",
      text: "Bạn có chắc chắn muốn thanh toán không?",
      showCancelButton: true,
      icon: "question",
      buttonsStyling: false,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
      customClass: {
        confirmButton: "swal-btn-confirm",
        cancelButton: "swal-btn-cancel",
        popup: "swal-popup-fixed",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const dataAdress = {
          address: shippingInfo.address,
          phone: shippingInfo.phone,
          receiver: shippingInfo.receiver,
          email: shippingInfo.email || null,
          cart: cart,
          totalPrice: Math.max(subtotal + shippingFee, 0),
          payments: paymentMethod,
          shippingFee: shippingFee,
        };
        console.log("📦 Creating order with data:", dataAdress);
        
        if (paymentMethod === "tiền mặt") {
          // Thanh toán tiền mặt: Tạo đơn hàng → hiện popup thành công → lưu đơn hàng
          try {
            const response = isLoggedIn
              ? await orderApi.createOrder(dataAdress)
              : await orderApi.createOrderGuest(dataAdress);

            console.log("✅ Order response:", response);
            dispatch(resetCart());

            // Hiện popup thành công giữa màn hình
            Swal.fire({
              title: "Thanh toán thành công!",
              text: `Đơn hàng của bạn đã được tạo thành công. Mã đơn hàng: ${
                response?.data?._id || response?._id || ""
              }`,
              icon: "success",
              confirmButtonText: "Xác nhận",
              buttonsStyling: false,
              customClass: {
                confirmButton: "swal-btn-confirm",
                popup: "swal-popup-fixed",
              },
            }).then(() => {
              // Redirect về trang quản lý đơn hàng nếu đã đăng nhập, nếu không thì về trang chủ
              if (isLoggedIn) {
                navigate("/account/orders");
              } else {
                navigate("/");
              }
            });
          } catch (error) {
            const statusCode = error?.response?.status;
            const errorMsg = error?.response?.data?.message || error?.message;
            console.error("❌ Error:", statusCode, errorMsg);
            
            // Nếu lỗi 403 Forbidden hoặc permission denied, fallback sang guest mode + tiền mặt
            if (statusCode === 403 || errorMsg?.includes("quyền")) {
              console.log("🔄 Fallback: 403 Forbidden, switching to guest mode...");
              try {
                const guestResponse = await orderApi.createOrderGuest(dataAdress);
                console.log("✅ Guest order created:", guestResponse);
                dispatch(resetCart());

                Swal.fire({
                  title: "Thanh toán thành công!",
                  text: `Đơn hàng của bạn đã được tạo thành công. Mã đơn hàng: ${
                    guestResponse?.data?._id || guestResponse?._id || ""
                  }`,
                  icon: "success",
                  confirmButtonText: "Xác nhận",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "swal-btn-confirm",
                    popup: "swal-popup-fixed",
                  },
                }).then(() => {
                  navigate("/");
                });
              } catch (guestError) {
                console.error("❌ Guest order also failed:", guestError.message);
                toast.dismiss();
                toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
              }
            } else {
              console.log("❌ Other error:", error.message);
              toast.dismiss();
              toast.error(errorMsg || "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
            }
          }
        } else {
          // Thanh toán PayOS: Lưu lại order info
          localStorage.setItem("order", JSON.stringify(dataAdress));
          if (paymentMethod === "payos") {
            // Redirect tới PayOS payment page
            navigate("/payment-bank?method=payos");
          }
        }
      }
    });
  };

  return (
    <>
      {cart?.length > 0 ? (
        <>
          <div className="payment container">
            <div className="information-payment">
              <div className="bg-white w-full rounded-lg ">
                <span className="text-xl font-bold p-5 inline-block">
                  Thông tin nhận hàng
                </span>
                <div className="flex flex-col px-5 pb-10 h-[490px] overflow-hidden overflow-y-auto">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      {address && address.length > 0 ? (
                        address.map((item, index) => {
                          const isSelected = selectedAddressId === index || (selectedAddressId === null && item.setDefault);
                          return (
                            <div
                              key={index}
                              className={`w-full bg-white border-2 ${
                                isSelected ? "border-blue-500 border-solid" : "border-dotted"
                              } text-black px-5 py-5 rounded-lg flex items-center justify-between my-2 cursor-pointer hover:border-blue-300 transition-colors`}
                              onClick={() => setSelectedAddressId(index)}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <input
                                  type="radio"
                                  name="selectedAddress"
                                  checked={isSelected}
                                  onChange={() => setSelectedAddressId(index)}
                                  className="w-5 h-5 text-blue-600"
                                />
                                <div className="flex flex-col justify-between flex-1">
                                  <div className="flex items-center gap-x-5 mb-2">
                                    <h3 className="font-medium text-base">{item.name}</h3>
                                    {item.setDefault && (
                                      <div className="px-1 py-1 bg-blue-100 rounded-md font-medium text-sm">
                                        Mặc định
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-normal">
                                      Địa chỉ: {item.detail} , {item.ward}, {item.province}
                                      {item.country ? `, ${item.country}` : ""}
                                    </span>
                                    <span className="text-sm font-normal">
                                      Điện thoại: {item.phone}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                className="ml-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingAddressId(index);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 20.25l1.097-3.97a4.5 4.5 0 011.13-1.897l8.628-8.628z"
                                  />
                                </svg>
                                Chỉnh sửa
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600 mb-4">Chưa có địa chỉ nào</p>
                    <UserAddress />
                        </div>
                      )}
                      {address && address.length > 0 && (
                        <div className="mt-4">
                          <button
                            className="w-full bg-white h-[60px] rounded-md border-2 border-dotted focus:border-solid hover:border-blue-300 transition-colors"
                            onClick={() => {
                              // Mở modal thêm địa chỉ - cần import và sử dụng UserAddress component
                              // Tạm thời navigate đến trang địa chỉ
                              navigate("/account/address");
                            }}
                          >
                            <div className="flex items-center justify-center gap-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                              <span className="text-base font-medium">Thêm địa chỉ mới</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Bạn chưa đăng nhập, vui lòng nhập thông tin nhận hàng.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-sm font-semibold text-gray-800">
                            Họ và tên *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.name}
                            onChange={(e) => handleFieldChange("name", e.target.value)}
                            onBlur={() => handleFieldBlur("name")}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white ${
                              touched.name && guestErrors.name
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="Tên người nhận"
                            minLength={3}
                            maxLength={80}
                          />
                          {touched.name && guestErrors.name && (
                            <span className="text-xs text-red-500 mt-1">
                              {guestErrors.name}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-sm font-semibold text-gray-800">
                            Số điện thoại *
                          </label>
                          <input
                            type="tel"
                            value={guestInfo.phone}
                            onChange={(e) => handleFieldChange("phone", e.target.value)}
                            onBlur={() => handleFieldBlur("phone")}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white ${
                              touched.phone && guestErrors.phone
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="Số điện thoại liên hệ"
                            inputMode="numeric"
                            pattern="0[0-9]{9,10}"
                            maxLength={11}
                          />
                          {touched.phone && guestErrors.phone && (
                            <span className="text-xs text-red-500 mt-1">
                              {guestErrors.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-800">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={guestInfo.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          onBlur={() => handleFieldBlur("email")}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white ${
                            touched.email && guestErrors.email
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="email@domain.com"
                          maxLength={120}
                        />
                        {touched.email && guestErrors.email && (
                          <span className="text-xs text-red-500 mt-1">
                            {guestErrors.email}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-800">
                          Địa chỉ nhận hàng *
                        </label>
                        <textarea
                          rows="3"
                          value={guestInfo.address}
                          onChange={(e) => handleFieldChange("address", e.target.value)}
                          onBlur={() => handleFieldBlur("address")}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white ${
                            touched.address && guestErrors.address
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="Số nhà, phường/xã, quận/huyện, tỉnh/thành phố"
                          minLength={5}
                          maxLength={255}
                        />
                        {touched.address && guestErrors.address && (
                          <span className="text-xs text-red-500 mt-1">
                            {guestErrors.address}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col px-5 mt-10 rounded-lg py-5 bg-white h-[235px]">
                <span className="text-xl font-bold">
                  Phương thức thanh toán
                </span>
                <div className="flex items-center justify-between mt-10 px-16 ">
                  <button
                    className={`px-8 py-8 border-2 border-solid text-xl font-bold flex items-center justify-between gap-x-2 rounded-lg ${
                      paymentMethod === "tiền mặt" ? "border-blue-500" : ""
                    }`}
                    onClick={() => handlePaymentMethodChange("tiền mặt")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="green"
                      className="w-6 h-6 animate-pulse"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                    Thanh toán tiền mặt
                  </button>
                  <button
                    className={`px-8 py-8 border-2 border-solid text-xl font-bold flex items-center justify-between gap-x-2 rounded-lg ${
                      paymentMethod === "payos" ? "border-purple-500" : ""
                    }`}
                    onClick={() => handlePaymentMethodChange("payos")}
                  >
                    <span className="text-2xl">📲</span>
                    Thanh toán PayOS
                  </button>
                </div>
              </div>
            </div>

            <div className="information-order">
              <div className="flex flex-col bg-white rounded-lg pb-10 h-[560px] overflow-hidden overflow-y-auto">
                <div className="flex items-center justify-between p-5 ">
                  <span className="text-xl font-bold inline-block">
                    Thông tin đơn hàng
                  </span>
                  <span
                    className="text-base font-medium text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => navigate("/cart")}
                  >
                    Chỉnh sửa
                  </span>
                </div>
                {cart?.length > 0 &&
                  cart.map((item) => (
                    <InformationOrder key={item.id} data={item} />
                  ))}
              </div>
              <div className="flex flex-col bg-white rounded-lg pb-5 mt-10">
                <div className="flex items-center justify-between p-5">
                  <span className="text-[#8b8f9b] text-lg font-medium">
                    Tổng tạm tính
                  </span>
                  <span className="text-lg font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-5 pb-3">
                  <span className="text-[#8b8f9b] text-lg font-medium">
                    Phí vận chuyển
                  </span>
                  <span className="text-lg font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">Miễn phí</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                {subtotal < 800000 && (
                  <div className="px-5 pb-3">
                    <span className="text-sm text-orange-600">
                      Mua thêm {formatPrice(800000 - subtotal)} để được miễn phí vận chuyển
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between px-5 pb-3">
                  <span className="text-[#8b8f9b] text-lg font-medium">
                    Thành tiền
                  </span>
                  <span className="text-xl font-semibold text-red-600">
                    {formatPrice(Math.max(subtotal + shippingFee, 0))}
                  </span>
                </div>
                <button
                  className="bg-blue-700 text-white rounded-lg font-medium text-sm mx-3 py-3 mt-5"
                  onClick={handleClick}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CartHidden />
      )}

      {/* Modal chỉnh sửa địa chỉ */}
      {editingAddressId !== null && address[editingAddressId] && (
        <ItemAddress
          data={address[editingAddressId]}
          data_key={address[editingAddressId]._id}
          onClose={() => setEditingAddressId(null)}
        />
      )}
    </>
  );
};

export default PaymentPage;
