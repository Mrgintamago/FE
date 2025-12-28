import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import Checkbox from "../components/checkbox/Checkbox";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object({
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .min(3, "Tối thiểu phải có 3 ký tự")
    .max(30, "Vượt quá 30 ký tự cho phép"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Tối thiểu 8 ký tự")
    .max(30, "Vượt quá 30 ký tự cho phép")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: "Bắt buộc phải có chữ hoa, chữ thường, ký tự đặc biệt, số",
      }
    ),
  retypePassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu chưa đúng"),
  term: yup.boolean().oneOf([true], "Vui lòng chấp nhận điều khoản"),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
      term: false,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      const data = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        passwordConfirm: values.retypePassword,
      };
      const action = register(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
      toast.dismiss();
      toast.success(
        "Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác thực.",
        { pauseOnHover: false }
      );
      reset({
        fullname: "",
        email: "",
        password: "",
        retypePassword: "",
        term: false,
      });
      navigate("/verify");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message, { pauseOnHover: false });
    }
  };

  return (
    <AuthenticationPage subtitle="Tạo tài khoản mới để bắt đầu mua sắm">
      <form autoComplete="off" onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
        <Field>
          <Label htmlFor="fullname">Họ tên</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Mời bạn nhập tên của bạn"
            control={control}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm font-medium mt-1 animate-fade-in">
              {errors.fullname?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Mời bạn nhập email"
            control={control}
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-medium mt-1 animate-fade-in">
              {errors.email?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
          {errors.password && (
            <p className="text-red-500 text-sm font-medium mt-1 animate-fade-in">
              {errors.password?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Nhập lại mật khẩu</Label>
          <InputPasswordToggle
            control={control}
            name="retypePassword"
          ></InputPasswordToggle>
          {errors.retypePassword && (
            <p className="text-red-500 text-sm font-medium mt-1 animate-fade-in">
              {errors.retypePassword?.message}
            </p>
          )}
        </Field>

        <Field>
          <div className="flex items-start gap-x-3">
            <Checkbox
              control={control}
              text=""
              name="term"
            />
            <div className="flex-1">
              <label htmlFor="term" className="text-xs sm:text-sm md:text-base cursor-pointer font-medium">
                Tôi đồng ý với{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-[#1DC071] hover:underline font-semibold"
                >
                  các điều khoản
                </button>
              </label>
              {errors.term && (
                <p className="text-red-500 text-sm font-medium mt-1 animate-fade-in">
                  {errors.term?.message}
                </p>
              )}
            </div>
          </div>
        </Field>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          style={{
            width: "100%",
            height: "48px",
            marginTop: "24px",
          }}
        >
          {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        <div className="text-center pt-4">
          <span className="text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link
              to="/sign-in"
              className="text-[#1DC071] font-semibold hover:text-[#16a05a] hover:underline transition-all"
            >
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </form>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Điều khoản sử dụng</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 sm:px-6 py-4 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">1. Điều khoản chung</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  Bằng việc đăng ký tài khoản và sử dụng dịch vụ của TQN Figure, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">2. Đăng ký tài khoản</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                  Khi đăng ký tài khoản, bạn cam kết:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-700 space-y-1 ml-4">
                  <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
                  <li>Bảo mật thông tin đăng nhập của bạn</li>
                  <li>Chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản của bạn</li>
                  <li>Thông báo ngay cho chúng tôi nếu phát hiện vi phạm bảo mật</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">3. Quyền và nghĩa vụ của người dùng</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                  Bạn có quyền:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-700 space-y-1 ml-4 mb-3">
                  <li>Truy cập và sử dụng các dịch vụ của TQN Figure</li>
                  <li>Đặt hàng và mua sản phẩm từ website</li>
                  <li>Nhận thông tin về sản phẩm, khuyến mãi</li>
                  <li>Yêu cầu hỗ trợ từ đội ngũ chăm sóc khách hàng</li>
                </ul>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                  Bạn có nghĩa vụ:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-700 space-y-1 ml-4">
                  <li>Tuân thủ pháp luật Việt Nam khi sử dụng dịch vụ</li>
                  <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                  <li>Không chia sẻ thông tin đăng nhập với bên thứ ba</li>
                  <li>Thanh toán đầy đủ và đúng hạn cho các đơn hàng</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">4. Quyền sở hữu trí tuệ</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  Tất cả nội dung trên website TQN Figure, bao gồm nhưng không giới hạn: logo, hình ảnh, văn bản, thiết kế, phần mềm đều thuộc quyền sở hữu của TQN Figure hoặc được cấp phép sử dụng. Bạn không được sao chép, phân phối, hoặc sử dụng bất kỳ nội dung nào mà không có sự cho phép bằng văn bản từ chúng tôi.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">5. Bảo mật thông tin</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  TQN Figure cam kết bảo vệ thông tin cá nhân của bạn theo quy định của pháp luật. Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để bảo vệ dữ liệu của bạn. Tuy nhiên, không có hệ thống nào là hoàn toàn an toàn, vì vậy bạn cũng cần có trách nhiệm bảo vệ thông tin của mình.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">6. Thanh toán và giao hàng</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                  Khi đặt hàng, bạn đồng ý:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-700 space-y-1 ml-4">
                  <li>Thanh toán đầy đủ theo giá niêm yết tại thời điểm đặt hàng</li>
                  <li>Chấp nhận các phương thức thanh toán mà chúng tôi cung cấp</li>
                  <li>Nhận hàng tại địa chỉ đã đăng ký hoặc điểm giao hàng được chỉ định</li>
                  <li>Kiểm tra hàng hóa trước khi nhận và báo ngay nếu có vấn đề</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">7. Đổi trả và hoàn tiền</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  Chính sách đổi trả và hoàn tiền được áp dụng theo quy định của TQN Figure. Bạn có thể xem chi tiết tại trang "Chính sách đổi trả" trên website. Việc đổi trả chỉ được chấp nhận trong thời hạn quy định và khi sản phẩm còn nguyên vẹn, chưa sử dụng.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">8. Chấm dứt tài khoản</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  TQN Figure có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn nếu bạn vi phạm các điều khoản này hoặc có hành vi không phù hợp. Bạn cũng có quyền yêu cầu xóa tài khoản của mình bất cứ lúc nào.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">9. Thay đổi điều khoản</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  TQN Figure có quyền thay đổi các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay sau khi được công bố trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi được coi là bạn đã chấp nhận các điều khoản mới.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">10. Liên hệ</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua:
                </p>
                <ul className="list-none text-xs sm:text-sm md:text-base text-gray-700 space-y-1 ml-4 mt-2">
                  <li>📞 Hotline: 0854 008 327</li>
                  <li>📧 Email: quynhnhu255910@gmail.com</li>
                  <li>📍 Địa chỉ: 97 Man Thiện, Tăng Nhơn Phú, Tp. Hồ Chí Minh</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mt-6">
                <p className="text-xs sm:text-sm text-gray-600">
                  <strong>Ngày có hiệu lực:</strong> {new Date().toLocaleDateString('vi-VN')}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Bằng việc đánh dấu vào ô "Tôi đồng ý với các điều khoản", bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý tuân thủ tất cả các điều khoản và điều kiện được nêu ở trên.
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-[#1DC071] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#1ab066] transition-colors font-semibold text-xs sm:text-sm md:text-base"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticationPage>
  );
};

export default SignUpPage;
