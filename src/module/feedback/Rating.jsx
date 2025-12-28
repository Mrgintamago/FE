import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const note = [
  {
    id: 1,
    content: "Rất tệ",
  },
  {
    id: 2,
    content: "Tệ",
  },
  {
    id: 3,
    content: "Bình thường",
  },
  {
    id: 4,
    content: "Tốt",
  },
  {
    id: 5,
    content: "Rất tốt",
  },
];

const Rating = ({ onClose, onSubmit, id, rating = 0, review = "" }) => {
  const { current } = useSelector((state) => state.user);
  const isLoggedIn = current !== null;
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(rating);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [content, setContent] = useState(review);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
  };

  const colors = {
    orange: "#ffba5a",
    gray: "#a9a9a9",
  };

  const handleOnSubmit = () => {
    if (!onSubmit) return;
    if (currentValue <= 0) {
      toast.dismiss();
      toast.warning("Vui lòng đánh giá sản phẩm");
      return;
    }
    // Review is optional, no validation needed
    if (!isLoggedIn) {
      // Email is required for guest reviews to verify order
      if (!guestEmail || !guestEmail.trim()) {
        toast.dismiss();
        toast.warning("Vui lòng nhập email để xác minh đơn hàng");
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail)) {
        toast.dismiss();
        toast.warning("Vui lòng nhập email hợp lệ");
        return;
      }
    }
    const data = {
      stars: currentValue,
      content: content || "", // Allow empty review
      id: id,
      guestName: !isLoggedIn ? (guestName.trim() || null) : undefined,
      guestEmail: !isLoggedIn ? (guestEmail.trim() || null) : undefined,
    };
    onSubmit(data);
    onClose();
  };

  return (
    <div className="flex flex-col justify-between">
      <span className="text-xl font-semibold text-center">
        Đánh giá & nhận xét
      </span>
      <div className="flex items-center justify-center mt-10 cursor-pointer gap-x-14">
        {stars.map((item, index) => (
          <FaStar
            key={index}
            size={30}
            onClick={() => handleClick(index + 1)}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.gray
            }
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-x-11 mt-5">
        {note.map((item, index) => (
          <span key={index} className="text-base font-semibold">
            {item.content}
          </span>
        ))}
      </div>
      {!isLoggedIn && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên của bạn (tùy chọn)
            </label>
            <input
              type="text"
              placeholder="Nhập tên của bạn (để trống sẽ hiển thị 'Người ẩn danh')"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email của bạn <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Nhập email đã dùng để đặt hàng (bắt buộc để xác minh đơn hàng)"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Email này phải trùng với email đã dùng khi đặt hàng và đơn hàng phải đã giao thành công
            </p>
          </div>
        </div>
      )}
      <textarea
        placeholder="Nhận xét (tùy chọn) - Xin mời chia sẻ một số cảm nhận về sản phẩm ..."
        className="w-full h-[250px] bg-[#f8f8f8] mt-10 p-5 text-base font-medium rounded-lg resize-none border-2 border-solid"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex items-center justify-end gap-x-5 mt-8">
        <button
          className="py-2 px-4 border-2 border-blue-500 border-solid rounded-lg text-blue-500 font-semibold"
          onClick={onClose}
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="py-2 px-4  rounded-lg text-white bg-red-600 font-semibold border-2 border-solid border-red-600"
          onClick={handleOnSubmit}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Rating;
