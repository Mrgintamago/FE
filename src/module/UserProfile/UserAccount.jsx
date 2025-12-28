import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeding";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import ImageUpload from "../../components/images/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refresh, updateInfoUser } from "../../redux/auth/userSlice";
import { action_status } from "../../utils/constants/status";
import Skeleton from "../../components/skeleton/Skeleton";
import { useNavigate } from "react-router-dom";

const today = moment();
const schema = yup.object({
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .min(3, "Tối thiểu phải có 3 ký tự")
    .max(30, "Vượt quá 30 ký tự cho phép"),
  sdt: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Định dạng số điện thoại không đúng",
      excludeEmptyString: true,
    }),
  dateOfBirth: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .max(today, "Ngày sinh không hợp lệ"),
  gender: yup.string().nullable().oneOf(["nam", "nữ", "khác", null, ""], "Giới tính không hợp lệ"),
});

const Gender = {
  NAM: "nam",
  NU: "nữ",
  Diff: "khác",
};

const UserAccount = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, update, status, current } = useSelector((state) => state.user);

  const watchGender = watch("gender");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (current === null) {
      toast.dismiss();
      toast.warning("Vui lòng đăng nhập");
      navigate("/sign-in");
    }
  }, [current]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (update) {
      dispatch(refresh());
      // Reload user data after update to get latest information
      dispatch(getUser());
    }
  }, [update, dispatch]);

  useEffect(() => {
    // Use user data if available, otherwise use current
    const userData = user && Object.keys(user).length > 0 ? user : current;
    if (userData && Object.keys(userData).length > 0) {
      reset({
        fullname: userData?.name || "",
        image: userData?.avatar || "",
        email: userData?.email || "",
        sdt: userData?.phone || "",
        dateOfBirth: userData?.dateOfBirth || "",
        gender: userData?.gender || "",
      });
      setImage(userData?.avatar || "");
    }
  }, [user, current, reset]);

  const handleSelectImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setProgress(0);
    
    try {
    const urlImage = await handleUpLoadImage(file);
    setImage(urlImage);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Không thể tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
      // Reset progress sau 1 giây để ẩn progress bar
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  };

  const handleUpLoadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios({
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "https://api.imgbb.com/1/upload?key=faf46b849aaf25c8587aec2835f05b26",
      onUploadProgress: (data) => {
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    return response.data.data.url;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleUpdate = async (values) => {
    const cloneValues = { ...values };
    cloneValues.gender = getValues("gender") || null;
    cloneValues.dateOfBirth = getValues("dateOfBirth") || null;
    cloneValues.avatar = image || user?.avatar || "";
    cloneValues.name = values.fullname;
    // Xử lý phone: nếu rỗng thì gửi null, không xóa trường
    cloneValues.phone = values.sdt && values.sdt.trim() !== "" ? values.sdt : null;
    // Xử lý dateOfBirth: nếu rỗng thì gửi null
    cloneValues.dateOfBirth = cloneValues.dateOfBirth && cloneValues.dateOfBirth.trim() !== "" ? cloneValues.dateOfBirth : null;
    // Xử lý gender: nếu rỗng thì gửi null
    cloneValues.gender = cloneValues.gender && cloneValues.gender.trim() !== "" ? cloneValues.gender : null;
    
    try {
      const result = await dispatch(updateInfoUser(cloneValues)).unwrap();
      // Form will be updated automatically via useEffect when user/current changes
      toast.dismiss();
      toast.success("Cập nhật thông tin thành công", { pauseOnHover: false });
    } catch (error) {
      console.error("Update error:", error);
      toast.dismiss();
      const errorMessage = typeof error === 'string' ? error : (error.message || "Có lỗi xảy ra khi cập nhật thông tin");
      toast.error(errorMessage);
    }
  };

  const handleDeleteImage = () => {
    setImage("");
    setProgress(0);
    setIsUploading(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg">
        <DashboardHeading
          title="Thông tin tài khoản"
          className="px-2 sm:px-4 py-2 sm:py-4"
        ></DashboardHeading>
        {status === action_status.LOADING && (!user || Object.keys(user).length === 0) && (!current || Object.keys(current).length === 0) && (
          <div className="pb-16 px-3 sm:px-6">
            <Field>
              <Skeleton className="w-20 sm:w-[100px] h-3 sm:h-4 rounded-lg" />
              <Skeleton className="w-24 sm:w-36 h-24 sm:h-36 rounded-full mx-auto" />
            </Field>
            <Field>
              <Skeleton className="w-20 sm:w-[100px] h-3 sm:h-4 rounded-lg" />
              <Skeleton className="w-full h-3 sm:h-4 rounded-md" />
            </Field>
            <Field>
              <Skeleton className="w-20 sm:w-[100px] h-3 sm:h-4 rounded-lg" />
              <Skeleton className="w-full h-3 sm:h-4 rounded-md" />
            </Field>
            <Field>
              <Skeleton className="w-20 sm:w-[100px] h-3 sm:h-4 rounded-lg" />
              <Skeleton className="w-full h-3 sm:h-4 rounded-md" />
            </Field>
            <Field>
              <Skeleton className="w-20 sm:w-[100px] h-3 sm:h-4 rounded-lg" />
              <Skeleton className="w-full h-3 sm:h-4 rounded-md" />
            </Field>
            <Field>
              <Skeleton className="w-20 sm:w-[100px] h-3 sm:h-4 rounded-lg" />
              <div className="flex items-center gap-x-3 sm:gap-x-5">
                <Skeleton className="w-5 sm:w-6 h-5 sm:h-6 rounded-full" />
                <Skeleton className="w-5 sm:w-6 h-5 sm:h-6 rounded-full" />
                <Skeleton className="w-5 sm:w-6 h-5 sm:h-6 rounded-full" />
              </div>
            </Field>
            <Skeleton className="w-[120px] sm:w-[160px] md:w-[200px] h-[32px] sm:h-[36px] md:h-[40px] rounded-lg mx-auto mt-6 sm:mt-10" />
          </div>
        )}
        {((user && Object.keys(user).length > 0) || (current && Object.keys(current).length > 0) || status === action_status.SUCCEEDED) && (
          <form className="pb-16 px-3 sm:px-6" onSubmit={handleSubmit(handleUpdate)}>
            <Field>
              <Label>Ảnh đại diện</Label>
              <div className="relative w-24 sm:w-32 md:w-40">
              <ImageUpload
                onChange={handleSelectImage}
                className="mx-auto"
                progress={progress}
                image={image}
                handleDeleteImage={handleDeleteImage}
                disabled={isUploading}
              ></ImageUpload>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-full z-20">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-3 sm:border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {progress > 0 ? `${progress}%` : "Đang tải..."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Field>

            <Field>
              <Label htmlFor="fullname">Họ tên</Label>
              <Input name="fullname" control={control} type="text"></Input>
              {errors.fullname && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.fullname?.message}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input name="email" control={control} disabled></Input>
            </Field>

            <Field>
              <Label htmlFor="sdt">Số điện thoại</Label>
              <Input name="sdt" type="number" control={control}></Input>
              {errors.sdt && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.sdt?.message}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input name="dateOfBirth" type="date" control={control}></Input>
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.dateOfBirth?.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldCheckboxes>
                <Label htmlFor="gender">Giới tính</Label>
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === Gender.NAM}
                  value={Gender.NAM}
                  onClick={() => setValue("gender", "nam")}
                >
                  Nam
                </Radio>
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === Gender.NU}
                  value={Gender.NU}
                  onClick={() => setValue("gender", "nu")}
                >
                  Nữ
                </Radio>
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === Gender.Diff}
                  value={Gender.Diff}
                  onClick={() => setValue("gender", "khac")}
                >
                  Khác
                </Radio>
              </FieldCheckboxes>
              {errors.gender && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.gender?.message}
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
              <span className="text-xs sm:text-sm md:text-base font-medium">Cập nhật</span>
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserAccount;
