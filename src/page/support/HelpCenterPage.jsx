import React from "react";

const HelpCenterPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Trung tâm hỗ trợ</h1>
      <div className="bg-white rounded-lg p-8 shadow-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">Làm thế nào để đặt hàng?</h3>
                <p className="text-gray-600">
                  Bạn có thể đặt hàng trực tiếp trên website bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">Phương thức thanh toán nào được chấp nhận?</h3>
                <p className="text-gray-600">
                  Chúng tôi chấp nhận thanh toán qua PayOS (QR code) và thanh toán khi nhận hàng (COD).
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">Thời gian giao hàng là bao lâu?</h3>
                <p className="text-gray-600">
                  Thời gian giao hàng từ 3-7 ngày làm việc tùy thuộc vào địa điểm giao hàng.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">Chính sách đổi trả như thế nào?</h3>
                <p className="text-gray-600">
                  Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn, chưa sử dụng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;

