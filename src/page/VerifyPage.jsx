import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changeState, verify, resendVerifyCode } from "../redux/auth/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object({
  verify: yup
    .string()
    .required("Vui lòng nhập mã xác nhận")
    .min(6, "Mã xác nhận tối thiểu 6 ký tự"),
});
const VerifyPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { verify: "" },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (
      JSON.parse(localStorage.getItem("user")) === null &&
      localStorage.getItem("jwt") === null
    ) {
      return navigate("/sign-up");
    } else if (JSON.parse(localStorage.getItem("user")).active === "active") {
      toast.dismiss();
      toast.success("Chào mừng bạn đến với TQN Figure", { pauseOnHover: false });
      return navigate("/");
    }
  }, []);

  const dem = useRef(0);
  const dispatch = useDispatch();
  const [isResending, setIsResending] = useState(false);

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await dispatch(resendVerifyCode()).unwrap();
      toast.dismiss();
      toast.success("Đã gửi lại mã xác nhận. Vui lòng kiểm tra email!", {
        pauseOnHover: false,
        autoClose: 5000,
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Không thể gửi lại mã. Vui lòng thử lại!", {
        pauseOnHover: false,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (values) => {
    if (!isValid) return;
    console.log(values);
    const data = {
      encode: values.verify,
    };
    try {
      const action = verify(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      toast.dismiss();
      toast.success("Chào mừng bạn đến với TQN Figure", { pauseOnHover: false });
      navigate("/");
      reset({
        verify: "",
      });
    } catch (error) {
      dem.current = dem.current + 1;
      console.log(dem.current);
      if (dem.current >= 3) {
        const data = {
          state: "ban",
        };
        toast.dismiss();
        toast.warning("Bạn nhập sai mã xác nhận 3 lần", {
          pauseOnHover: false,
        });
        if (JSON.parse(localStorage.getItem("user")).active === "verify") {
          const action = changeState(data);
          const resultAction = await dispatch(action);
          navigate("/sign-up");
          dem.current = 0;
        }
      } else {
        toast.dismiss();
        toast.error(error.message, { pauseOnHover: false });
      }
    }
  };
  return (
    <AuthenticationPage>
      <form
        onSubmit={handleSubmit(handleVerify)}
        autoComplete="off"
        className="pb-3"
      >
        <Field>
          <Label htmlFor="verify">Mã xác nhận</Label>
          <Input
            name="verify"
            type="text"
            placeholder="Mời bạn nhập mã xác nhận"
            control={control}
          ></Input>
          {errors.verify && (
            <p className="text-red-500 text-xs sm:text-sm md:text-base font-medium">
              {errors.verify?.message}
            </p>
          )}
        </Field>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          style={{
            width: "100%",
            maxWidth: 250,
            height: "44px",
            margin: "20px auto",
          }}
        >
          Xác nhận
        </Button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm mb-2">
          Chưa nhận được mã xác nhận?
        </p>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-[#1DC071] hover:underline font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? "Đang gửi..." : "Vui lòng gửi lại mã"}
        </button>
      </div>
    </AuthenticationPage>
  );
};

export default VerifyPage;
