import React from "react";

const CompanyPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Công ty</h1>
      <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Thông tin công ty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Tên công ty:</p>
              <p className="text-gray-600">TQN Figure Co., Ltd.</p>
            </div>
            <div>
              <p className="font-semibold">Mã số thuế:</p>
              <p className="text-gray-600">0123456789</p>
            </div>
            <div>
              <p className="font-semibold">Địa chỉ:</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=97+Man+Thiện,+Tăng+Nhơn+Phú,+Tp.+Hồ+Chí+Minh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                97 Man Thiện, Tăng Nhơn Phú, Tp. Hồ Chí Minh
              </a>
            </div>
            <div>
              <p className="font-semibold">Năm thành lập:</p>
              <p className="text-gray-600">2020</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lĩnh vực hoạt động</h2>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi chuyên kinh doanh các sản phẩm mô hình figure, nendoroid, figma và các phụ kiện liên quan đến anime, manga.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;

