import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";
import QuantityCard from "./QuantityCard";
import { formatPrice } from "../../utils/formatPrice";
import { useSelector } from "react-redux";
import CartHidden from "./CartHidden";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDF from "../../components/pdf/PDF";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "TQN Figure - Chuyên bán mô hình figure",
    onAfterPrint: () => {
      toast.dismiss();
      toast.success("In thành công báo giá sản phẩm", { pauseOnHover: false });
    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="mt-10">
      <div className="container">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="text-xs sm:text-sm md:text-base text-[#a8b4c9] flex items-center font-medium"
          >
            Trang chủ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 mx-1 sm:mx-2 md:mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <span className="text-xs sm:text-sm md:text-base text-[#a8b4c9] font-medium">Giỏ hàng</span>
        </div>

        {cart?.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 sm:mt-10 gap-3">
              <div className="text-lg sm:text-xl font-bold">Giỏ hàng</div>
              <button
                className="text-xs sm:text-sm font-medium border-2 rounded-lg py-2 px-2 sm:px-3 border-gray-600 hover:bg-gray-50"
                onClick={handlePrint}
              >
                Tải báo giá
              </button>
            </div>

            <div className="cart">
              <div className="information-cart mt-4 sm:mt-7 bg-white text-xs sm:text-sm md:text-base rounded-lg overflow-x-auto">
                <Table>
                  <thead>
                    <tr>
                      <th className="text-xs sm:text-sm">Tên sản phẩm</th>
                      <th className="text-xs sm:text-sm">Đơn giá</th>
                      <th className="text-xs sm:text-sm">Số lượng</th>
                      <th className="text-xs sm:text-sm">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.length > 0 &&
                      cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <ProductCard data={item} />
                          </td>
                          <td>
                            <PriceCard data={item} />
                          </td>
                          <td>
                            <QuantityCard data={item} />
                          </td>
                          <td className="text-xs sm:text-sm md:text-base font-semibold">
                            {formatPrice(
                              (item.product.promotion || item.product.price) * item.quantity
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <div className="information-price bg-white mt-4 sm:mt-7 text-xs sm:text-sm md:text-base rounded-lg flex flex-col justify-start p-3 sm:p-4 md:p-6">
                <span className="font-medium text-sm sm:text-base">Thanh toán</span>
                <div className="flex items-center justify-between py-3 sm:py-4">
                  <span className="text-[#8b8f9b] font-medium">
                    Tổng tạm tính
                  </span>
                  <span className="text-xs sm:text-sm md:text-base">
                    {formatPrice(
                      cart?.reduce(
                        (count, item) =>
                          count + item.quantity * (item.product.promotion || item.product.price),
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8b8f9b] font-medium">
                    Thành tiền
                  </span>
                  <span className="text-blue-700 font-semibold text-sm sm:text-base md:text-lg">
                    {formatPrice(
                      cart?.reduce(
                        (count, item) =>
                          count + item.quantity * (item.product.promotion || item.product.price),
                        0
                      )
                    )}
                  </span>
                </div>
                <button
                  className="bg-blue-700 text-white rounded-lg mx-auto py-2 sm:py-3 mt-4 w-full text-xs sm:text-sm md:text-base font-medium hover:bg-blue-800 transition-colors"
                  onClick={handleCheckout}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </>
        ) : (
          <CartHidden />
        )}
      </div>
      <PDF componentRef={componentRef} />
    </div>
  );
};

export default CartPage;
