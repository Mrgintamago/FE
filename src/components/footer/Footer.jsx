import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 mt-auto">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-start justify-between gap-6 pt-4 pb-2">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">Hỗ trợ</span>
            <div className="mt-3 flex-col flex space-y-2">
              <Link to="/support/help-center" className="text-sm hover:text-red-400">
                <span>Trung tâm hỗ trợ </span>
              </Link>
              <Link to="/account/orders" className="text-sm hover:text-red-400">
                <span>Theo dõi đơn hàng của bạn </span>
              </Link>
              <Link to="/account" className="text-sm hover:text-red-400">
                <span>Tài khoản của bạn </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">Công ty</span>
            <div className="mt-3 flex-col flex space-y-2">
              <Link to="/about/company" className="text-sm hover:text-red-400">
                <span>Công ty </span>
              </Link>
              <Link to="/about/us" className="text-sm hover:text-red-400">
                <span>Về chúng tôi </span>
              </Link>
              <Link to="/about/news" className="text-sm hover:text-red-400">
                <span>Tin tức & Bài báo</span>
              </Link>
              <Link to="/about/legal" className="text-sm hover:text-red-400">
                <span>Thông báo pháp lý</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">Quan hệ đối tác</span>
            <div className="mt-3 flex-col flex space-y-2">
              <Link
                to="/partners/benefits"
                className="text-sm hover:text-red-400 flex items-center gap-2"
              >
                <span>Lợi ích đối tác</span>
              </Link>
              <Link
                to="/partners/contact"
                className="text-sm hover:text-red-400 flex items-center gap-2"
              >
                <span>Liên hệ đối tác</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">Thông tin liên hệ</span>
            <div className="mt-3 flex-col flex space-y-2">
              <div className="text-sm">
                <span className="font-medium">Hotline:</span>{" "}
                <a href="tel:0854008327" className="hover:text-red-400">
                  0854 008 327
                </a>
              </div>
              <div className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:quynhnhu255910@gmail.com" className="hover:text-red-400">
                  quynhnhu255910@gmail.com
                </a>
              </div>
              <div className="text-sm">
                <span className="font-medium">Địa chỉ:</span>{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=97+Man+Thiện,+Tăng+Nhơn+Phú,+Tp.+Hồ+Chí+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 cursor-pointer underline"
                >
                  97 Man Thiện, Tăng Nhơn Phú, Tp. Hồ Chí Minh
                </a>
              </div>
              <div className="text-sm">
                <span className="font-medium">Giờ làm việc:</span> 8:00 - 22:00 (T2-CN)
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-4 bg-primary w-full py-3 flex items-center justify-center gap-x-3">
        <div className="w-[64px] h-[64px] flex items-center justify-center bg-white rounded-full shadow-md">
          <img src="/images/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <span className="shop-name text-xl font-bold text-white">TQN Figure</span>
      </div>
    </footer>
  );
};

export default Footer;
