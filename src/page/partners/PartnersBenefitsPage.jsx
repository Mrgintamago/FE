import React from "react";

const PartnersBenefitsPage = () => {
  const benefits = [
    {
      title: "Giá ưu đãi",
      description: "Hưởng mức giá đặc biệt dành riêng cho đối tác, giúp tăng lợi nhuận của bạn.",
      icon: "💰",
    },
    {
      title: "Hỗ trợ marketing",
      description: "Nhận tài liệu quảng cáo, hình ảnh chất lượng cao và các công cụ marketing khác.",
      icon: "📢",
    },
    {
      title: "Đào tạo chuyên nghiệp",
      description: "Tham gia các khóa đào tạo về sản phẩm và kỹ thuật bán hàng.",
      icon: "🎓",
    },
    {
      title: "Hỗ trợ kỹ thuật",
      description: "Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.",
      icon: "🔧",
    },
  ];

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Lợi ích đối tác</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{benefit.title}</h2>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersBenefitsPage;

