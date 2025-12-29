import React from "react";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import DashboardHeading from "../dashboard/DashboardHeding";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/button/Button";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/userSlice";

const schema = yup.object({
  passwordCurrent: yup
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
  passwordConfirm: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu chưa đúng"),
});

const UpdatePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (current === null) {
      toast.dismiss();
      toast.warning("Vui lòng đăng nhập");
      navigate("/sign-in");
    }
  }, [current]);

  const handleReset = async (values) => {
    if (!isValid) return;
    try {
      const response = await userApi.updatePassword(values);
      toast.dismiss();
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.log("[UPDATE PASSWORD] Response:", response);
      }
      
      // Check if server requires user to login again after password change
      if (response && response.requireLogin) {
        toast.warning("Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.", {
          autoClose: 2000,
          pauseOnHover: false,
        });
        
        // Dispatch logout action to clear Redux state
        dispatch(logout());
        
        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page after logout completes
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      } else {
        toast.success("Đổi mật khẩu thành công", { pauseOnHover: false });
        reset({
          passwordConfirm: "",
          password: "",
          passwordCurrent: "",
        });
      }
    } catch (error) {
      toast.dismiss();
      if (import.meta.env.DEV) {
        console.error("[UPDATE PASSWORD] Error:", error);
      }
      
      // If error indicates token is invalid/expired, force logout
      if (error.message && (error.message.includes("401") || error.message.includes("Token"))) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
          autoClose: 2000,
          pauseOnHover: false,
        });
        dispatch(logout());
        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      } else {
        // Show generic error message in production, detailed in development
        const errorMessage = import.meta.env.DEV 
          ? (error.message || "Có lỗi xảy ra") 
          : "Có lỗi xảy ra. Vui lòng thử lại.";
        toast.error(errorMessage, { pauseOnHover: false });
      }
    }
  };
  return (
    <div className="bg-white rounded-lg">
      <DashboardHeading
        title="Đổi mật khẩu"
        className="px-2 sm:px-4 py-2 sm:py-4"
      ></DashboardHeading>
      <form className="pb-16 px-3 sm:px-6 max-w-full" onSubmit={handleSubmit(handleReset)}>
        <Field>
          <Label htmlFor="passwordCurrent">Mật khẩu hiện tại</Label>
          <InputPasswordToggle
            control={control}
            name="passwordCurrent"
          ></InputPasswordToggle>
          {errors.passwordCurrent && (
            <p className="text-red-500 text-xs sm:text-sm md:text-base font-medium">
              {errors.passwordCurrent?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Mật khẩu mới</Label>
          <InputPasswordToggle
            control={control}
            name="password"
          ></InputPasswordToggle>
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm md:text-base font-medium">
              {errors.password?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="passwordConfirm">Nhập lại mật khẩu mới</Label>
          <InputPasswordToggle
            control={control}
            name="passwordConfirm"
          ></InputPasswordToggle>
          {errors.passwordConfirm && (
            <p className="text-red-500 text-xs sm:text-sm md:text-base font-medium">
              {errors.passwordConfirm?.message}
            </p>
          )}
        </Field>

        <Button
          kind="primary"
          className="w-full sm:w-auto"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          height="40px"
        >
          <span className="text-xs sm:text-sm md:text-base font-medium">Đổi mật khẩu</span>
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
