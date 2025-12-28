import React from "react";
import { Link } from "react-router-dom";

const PartnersPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Quan hệ đối tác</h1>
      <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Trở thành đối tác của TQN Figure</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Chúng tôi luôn tìm kiếm các đối tác chiến lược để cùng phát triển và mở rộng thị trường mô hình figure tại Việt Nam.
          </p>
          <Link
            to="/partners/apply"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đăng ký ngay
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lợi ích khi trở thành đối tác</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Hưởng mức giá ưu đãi đặc biệt</li>
            <li>Hỗ trợ marketing và quảng bá sản phẩm</li>
            <li>Được cung cấp tài liệu và hình ảnh sản phẩm chất lượng cao</li>
            <li>Hỗ trợ kỹ thuật và tư vấn chuyên nghiệp</li>
            <li>Chương trình khuyến mãi đặc biệt cho đối tác</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;

