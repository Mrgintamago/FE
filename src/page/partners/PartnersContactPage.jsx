import React from "react";
import { Link } from "react-router-dom";

const PartnersContactPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Liên hệ đối tác</h1>
      <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Thông tin liên hệ trực tiếp để trở thành đối tác
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Hotline đối tác</p>
                  <a href="tel:0854008327" className="text-blue-600 hover:underline">
                    0854 008 327
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Email đối tác</p>
                  <a
                    href="mailto:partners@tqnfigure.com"
                    className="text-blue-600 hover:underline"
                  >
                    partners@tqnfigure.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-gray-700 space-y-2">
              <p className="font-semibold text-gray-900">
                Liên hệ để được tư vấn trực tiếp và chi tiết về chương trình hợp tác:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm md:text-base">
                <li>Phản hồi trong 24h qua hotline/email.</li>
                <li>Nhận bảng giá & tài liệu trưng bày ngay sau khi đăng ký.</li>
                <li>Hỗ trợ setup chiến dịch mở bán đầu tiên.</li>
              </ul>
            </div>
            <Link
              to="/partners/apply"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow whitespace-nowrap text-center"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersContactPage;

