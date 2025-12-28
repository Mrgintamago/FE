import React, { useState } from "react";
import { toast } from "react-toastify";
import partnerApi from "../../api/partnerApi";

const PartnersApplyPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await partnerApi.register(formData);
      toast.success("Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.");
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        businessType: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/8 via-white to-red-200/10 pointer-events-none" />
      <div className="container py-10 relative">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 border border-red-100">
            <img src="/images/logo.png" alt="TQN Figure" className="w-16 h-16 object-contain" />
          </div>
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Đăng ký đối tác</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Đồng hành cùng TQN Figure
          </h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            Điền thông tin của bạn, chúng tôi sẽ phản hồi trong vòng 24h và gửi ngay bảng giá, tài liệu
            trưng bày cùng chương trình hỗ trợ mở bán.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-3xl mx-auto border border-red-50">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1 text-left">
              <p className="text-sm text-gray-500">Form đăng ký đối tác</p>
              <p className="text-base text-gray-700">Các mục có dấu * là bắt buộc</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold">
              Ưu tiên phản hồi 24h
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Tên công ty <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  placeholder="Công ty TNHH / Cửa hàng..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Người liên hệ <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  placeholder="Tên người liên hệ"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  placeholder="email@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Số điện thoại <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  placeholder="Số điện thoại liên hệ"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Địa chỉ <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                placeholder="Số nhà, phường, quận, tỉnh/thành phố"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Loại hình kinh doanh <span className="text-red-600">*</span>
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  <option value="">Chọn loại hình</option>
                  <option value="retail">Bán lẻ</option>
                  <option value="wholesale">Bán sỉ</option>
                  <option value="online">Bán hàng online</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Thông tin bổ sung</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                placeholder="Nhu cầu hợp tác, mong muốn hỗ trợ..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang gửi..." : "Gửi đơn đăng ký"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnersApplyPage;

