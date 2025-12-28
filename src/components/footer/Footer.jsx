import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 mt-auto">
      <div className="container max-w-6xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-white">Hỗ trợ</span>
            <div className="mt-2 sm:mt-3 flex-col flex space-y-1 sm:space-y-2">
              <Link to="/support/help-center" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Trung tâm hỗ trợ</span>
              </Link>
              <Link to="/account/orders" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Theo dõi đơn hàng</span>
              </Link>
              <Link to="/account" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Tài khoản</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-white">Công ty</span>
            <div className="mt-2 sm:mt-3 flex-col flex space-y-1 sm:space-y-2">
              <Link to="/about/company" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Công ty</span>
              </Link>
              <Link to="/about/us" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Về chúng tôi</span>
              </Link>
              <Link to="/about/news" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Tin tức & Bài báo</span>
              </Link>
              <Link to="/about/legal" className="text-xs sm:text-sm hover:text-red-400 transition-colors">
                <span>Thông báo pháp lý</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-white">Quan hệ đối tác</span>
            <div className="mt-2 sm:mt-3 flex-col flex space-y-1 sm:space-y-2">
              <Link
                to="/partners/benefits"
                className="text-xs sm:text-sm hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <span>Lợi ích đối tác</span>
              </Link>
              <Link
                to="/partners/contact"
                className="text-xs sm:text-sm hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <span>Liên hệ đối tác</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-white">Liên hệ</span>
            <div className="mt-2 sm:mt-3 flex-col flex space-y-1 sm:space-y-2">
              <div className="text-xs sm:text-sm">
                <span className="font-medium">Hotline:</span>{" "}
                <a href="tel:0854008327" className="hover:text-red-400 transition-colors">
                  0854 008 327
                </a>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:quynhnhu255910@gmail.com" className="hover:text-red-400 transition-colors break-all">
                  quynhnhu255910@gmail.com
                </a>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-medium">Địa chỉ:</span>{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=97+Man+Thiện,+Tăng+Nhơn+Phú,+Tp.+Hồ+Chí+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors cursor-pointer underline break-all"
                >
                  97 Man Thiện, Tăng Nhơn Phú
                </a>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-medium">Giờ làm:</span> 8:00-22:00
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-primary w-full py-3 sm:py-4 flex items-center justify-center gap-x-2 sm:gap-x-3">
        <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-white rounded-full shadow-md flex-shrink-0">
          <img src="/images/logo.png" alt="TQN Figure" className="w-full h-full object-contain" />
        </div>
        <span className="shop-name text-lg sm:text-xl font-bold text-white whitespace-nowrap">TQN Figure</span>
      </div>
    </footer>
  );
};

export default Footer;
