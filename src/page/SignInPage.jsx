import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Label from "../components/label/Label";
import AuthenticationPage from "./AuthenticationPage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, loginWithGoogle } from "../redux/auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import GoogleButton from "react-google-button";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { async } from "@firebase/util";

const schema = yup.object({
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
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // Cho phép tiếp tục, chỉ nhắc nhở nếu chưa xác thực
      if (user.active === "verify") {
        toast.dismiss();
        toast.info(
          "Tài khoản chưa được xác thực. Kiểm tra email để lấy mã xác nhận.",
          { pauseOnHover: false, autoClose: 4000 }
        );
      }
      if (user.active === "ban") {
        toast.dismiss();
        toast.warning("Tài khoản của bạn bị cấm. Vui lòng liên hệ admin");
        return;
      }
      toast.dismiss();
      toast.success("Chào mừng bạn đến với TQN Figure", { pauseOnHover: false });
      reset({
        email: "",
        password: "",
      });
      // Nếu không chọn ghi nhớ, chuyển token/user sang sessionStorage và xóa khỏi localStorage
      if (!rememberMe) {
        const token = localStorage.getItem("jwt");
        const userStored = localStorage.getItem("user");
        const tokenStream = localStorage.getItem("tokenStream");
        if (token) sessionStorage.setItem("jwt", token);
        if (userStored) sessionStorage.setItem("user", userStored);
        if (tokenStream) sessionStorage.setItem("tokenStream", tokenStream);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenStream");
      }
      navigate("/");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message, { pauseOnHover: false });
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleLogInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const data = {
          user: result._tokenResponse,
        };
        try {
          const resultAction = await dispatch(loginWithGoogle(data));
          unwrapResult(resultAction);
          toast.dismiss();
          toast.success("Chào mừng bạn đến với TQN Figure", { pauseOnHover: false });
          navigate("/");
        } catch (error) {
          toast.dismiss();
          console.log(error.message);
          toast.error(error.message, { pauseOnHover: false });
        }
      })
      .catch((error) => {
        console.log("Google login error:", error.message);
        toast.error("Đăng nhập bằng Google thất bại. Vui lòng thử lại!");
      });
  };

  const handleLogInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const data = {
          user: result._tokenResponse,
        };
        try {
          const resultAction = await dispatch(loginWithGoogle(data));
          unwrapResult(resultAction);
          toast.dismiss();
          toast.success("Chào mừng bạn đến với TQN Figure", { pauseOnHover: false });
          navigate("/");
        } catch (error) {
          toast.dismiss();
          console.log(error.message);
          toast.error(error.message, { pauseOnHover: false });
        }
      })
      .catch((error) => {
        console.log("Facebook login error:", error.message);
        toast.error("Đăng nhập bằng Facebook thất bại. Vui lòng thử lại!");
      });
  };

  return (
    <AuthenticationPage>
      <form
        className="pb-10"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Mời bạn nhập email"
            control={control}
          />
          {errors.email && (
            <p className="text-red-500 text-base font-medium">
              {errors.email?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
          {errors.password && (
            <p className="text-red-500 text-base font-medium">
              {errors.password?.message}
            </p>
          )}
        </Field>
        <div className="flex items-center gap-2 mt-3 mb-6">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-xs sm:text-sm md:text-base text-gray-700 cursor-pointer">
            Ghi nhớ đăng nhập lần sau
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm md:text-base text-black">
              Bạn chưa có tài khoản?
            </span>

            <Link
              to="/sign-up"
              className="text-sm sm:text-base md:text-lg text-[#1DC071] font-semibold hover:underline"
            >
              Đăng ký
            </Link>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm sm:text-base md:text-lg text-[#1DC071] font-semibold hover:underline"
          >
            Quên mật khẩu
          </Link>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          style={{
            width: "100%",
            maxWidth: 250,
            margin: "20px auto",
            height: "44px",
          }}
        >
          Đăng nhập
        </Button>
        <div className="w-full max-w-xs mx-auto space-y-2 sm:space-y-3">
          <GoogleButton
            type="light"
            style={{
              width: "100%",
              borderRadius: "8px",
              height: "44px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onClick={handleLogInWithGoogle}
          />
          <button
            type="button"
            onClick={handleLogInWithFacebook}
            className="w-full bg-[#1877F2] text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#166FE5] transition-colors font-semibold text-xs sm:text-sm md:text-base"
            style={{
              height: "44px",
            }}
          >
            <svg
              className="w-4 sm:w-5 h-4 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
            <span>Đăng nhập Facebook</span>
          </button>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
