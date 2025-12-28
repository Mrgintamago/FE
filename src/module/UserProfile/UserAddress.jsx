import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeding";
import ModalAdvanced from "../../components/Modal/ModalAdvanced";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Checkbox from "../../components/checkbox/Checkbox";
import { useForm } from "react-hook-form";
import DropdownSelect from "../../components/dropdown/DropdownSelect";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button/Button";
import ListAddress from "./ListAddress";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../redux/auth/addressSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .min(3, "Tối thiểu phải có 3 ký tự")
    .max(30, "Vượt quá 30 ký tự cho phép"),
  sdt: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Định dạng số điện thoại không đúng",
    }),
  address: yup.string().required("Vui lòng nhập địa chỉ nhà"),
  country: yup.string().required("Vui lòng chọn Quốc gia"),
  province: yup.string().required("Vui lòng nhập Tỉnh/Thành phố"),
  ward: yup.string().required("Vui lòng nhập Phường/Xã"),
});
const UserAddress = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      sdt: "",
      country: "",
      province: "",
      ward: "",
      address: "",
      setDefault: false,
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const dispatch = useDispatch();
  const { add } = useSelector((state) => state.address);
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (current === null) {
      toast.dismiss();
      toast.warning("Vui lòng đăng nhập");
      navigate("/sign-in");
    }
  }, [current]);

  const bodyStyle = document.body.style;
  let isLocked = false;

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const { data } = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2");
      // Sắp xếp theo tên quốc gia
      const sortedCountries = data
        .map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Không thể tải danh sách quốc gia");
    } finally {
      setLoadingCountries(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchCountries();
  }, []);

  useEffect(() => {
    if (showModal === false) {
      reset({
        fullname: "",
        sdt: "",
        country: "",
        province: "",
        ward: "",
        address: "",
        setDefault: false,
      });
      enableBodyScroll(bodyStyle);
      isLocked = false;
    } else {
      disableBodyScroll(bodyStyle);
      isLocked = true;
    }
  }, [showModal]);

  const handleSend = (values) => {
    const dataAddress = {
      name: values.fullname,
      phone: values.sdt,
      detail: values.address,
      country: values.country || getValues("country"),
      province: values.province,
      ward: values.ward,
      setDefault: values.setDefault || false,
    };

    try {
      dispatch(addAddress(dataAddress));
      toast.dismiss();
      toast.success("Thêm thành công địa chỉ");
      setShowModal(false);
      reset({
        fullname: "",
        sdt: "",
        country: "",
        province: "",
        ward: "",
        address: "",
        setDefault: false,
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Sổ địa chỉ"
        className="px-2 sm:px-4 py-2 sm:py-4"
      ></DashboardHeading>

      <button
        className="w-full bg-white min-h-[60px] sm:min-h-[80px] rounded-md border-2 border-dotted focus:border-solid transition-colors hover:border-solid"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-5 px-3 sm:px-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 sm:w-5 h-4 sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-xs sm:text-sm md:text-base font-medium">Thêm địa chỉ mới</span>
        </div>
      </button>

      <ModalAdvanced
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        bodyClassName="w-11/12 sm:w-3/4 md:w-2/3 lg:w-[750px] bg-white rounded-lg relative z-10 content max-h-[90vh]"
      >
        <div className="overflow-y-auto max-h-[85vh] px-4 sm:px-8 md:px-10 py-3 sm:py-5">
          <h3 className="text-base sm:text-lg font-semibold text-black text-left mb-3">
            Thông tin người nhận hàng
          </h3>
          <form onSubmit={handleSubmit(handleSend)} autoComplete="off">
            <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5">
              <Label htmlFor="fullname">* Họ tên</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Nhập tên của bạn"
                control={control}
              ></Input>
              {errors.fullname && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.fullname?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5">
              <Label htmlFor="sdt">* Số điện thoại</Label>
              <Input
                type="number"
                name="sdt"
                placeholder="Nhập số điện thoại"
                control={control}
              ></Input>
              {errors.sdt && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.sdt?.message}
                </p>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-black text-left mb-2 sm:mb-3">
              Địa chỉ nhận hàng
            </h3>

            <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5">
              <Label htmlFor="country">* Quốc gia</Label>
              <DropdownSelect
                control={control}
                name="country"
                dropdownLabel="Chọn quốc gia"
                setValue={setValue}
                data={countries}
                searchable={true}
              ></DropdownSelect>
              {errors.country && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.country?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
              <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5 flex-1">
                <Label htmlFor="province">* Tỉnh/Thành phố</Label>
                <Input
                  type="text"
                  name="province"
                  placeholder="Nhập Tỉnh/Thành phố"
                  control={control}
                ></Input>
                {errors.province && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium">
                    {errors.province?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5 flex-1">
                <Label htmlFor="ward">* Phường/Xã</Label>
                <Input
                  type="text"
                  name="ward"
                  placeholder="Nhập Phường/Xã"
                  control={control}
                ></Input>
                {errors.ward && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium">
                    {errors.ward?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5">
              <Label htmlFor="address">* Địa chỉ cụ thể</Label>
              <Input
                type="text"
                name="address"
                placeholder="Số nhà, ngõ, tên đường"
                control={control}
              ></Input>
              {errors.address && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                  {errors.address?.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Checkbox
                control={control}
                name="setDefault"
                text="Đặt thành địa chỉ mặc định"
              />
            </div>
            <div className="flex items-center justify-end gap-x-2 sm:gap-x-4 mt-4 sm:mt-5">
              <button
                className="p-2 sm:p-3 text-xs sm:text-sm md:text-base font-medium bg-white text-[#316BFF] rounded-lg border border-solid border-blue-400"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <Button
                height="40px sm:h-[50px]"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <span className="text-xs sm:text-sm md:text-base font-medium">Lưu</span>
              </Button>
            </div>
          </form>
        </div>
      </ModalAdvanced>

      <ListAddress />
    </div>
  );
};

export default UserAddress;
