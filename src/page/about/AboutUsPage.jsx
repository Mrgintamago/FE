import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Về chúng tôi</h1>
      <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">TQN Figure - Shop mô hình figure chính hãng</h2>
          <p className="text-gray-600 leading-relaxed">
            TQN Figure là cửa hàng chuyên cung cấp các mô hình figure chính hãng từ các nhà sản xuất uy tín như Good Smile Company, Bandai, Kotobukiya, và nhiều thương hiệu khác. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao với giá cả hợp lý.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sứ mệnh</h2>
          <p className="text-gray-600 leading-relaxed">
            Sứ mệnh của chúng tôi là mang đến cho cộng đồng yêu thích anime và manga những mô hình figure đẹp nhất, chất lượng nhất với dịch vụ chăm sóc khách hàng tận tâm.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cam kết</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Sản phẩm 100% chính hãng</li>
            <li>Giá cả cạnh tranh nhất thị trường</li>
            <li>Giao hàng nhanh chóng, an toàn</li>
            <li>Chính sách đổi trả linh hoạt</li>
            <li>Hỗ trợ khách hàng 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

