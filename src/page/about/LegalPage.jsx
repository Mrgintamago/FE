import React from "react";

const LegalPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Thông báo pháp lý</h1>
      <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Điều khoản sử dụng</h2>
          <p className="text-gray-600 leading-relaxed">
            Bằng việc sử dụng website TQN Figure, bạn đồng ý với các điều khoản và điều kiện được nêu ra trong tài liệu này. Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Chính sách bảo mật</h2>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng. Tất cả thông tin được mã hóa và bảo mật theo tiêu chuẩn quốc tế.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Chính sách đổi trả</h2>
          <p className="text-gray-600 leading-relaxed">
            Khách hàng có quyền đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn, chưa sử dụng và còn đầy đủ bao bì, phụ kiện.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quyền sở hữu trí tuệ</h2>
          <p className="text-gray-600 leading-relaxed">
            Tất cả nội dung trên website này, bao gồm logo, hình ảnh, văn bản đều thuộc quyền sở hữu của TQN Figure và được bảo vệ bởi luật bản quyền.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

