import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DropdownSelect from "../../components/dropdown/DropdownSelect";
import Input from "../../components/input/Input";
import Checkbox from "../../components/checkbox/Checkbox";
import Label from "../../components/label/Label";
import ModalAdvanced from "../../components/Modal/ModalAdvanced";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button/Button";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  deleteAddress,
  editAddress,
  setAddressDefault,
} from "../../redux/auth/addressSlice";

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
const ItemAddress = ({ data, data_key, onClose }) => {
  const [showModal, setShowModal] = useState(onClose ? true : false);
  const bodyStyle = document.body.style;
  let isLocked = false;
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      sdt: "",
      country: "",
      province: "",
      ward: "",
      address: "",
      setDefault: false,
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

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
    fetchCountries();
  }, []);

  useEffect(() => {
    if (showModal === true) {
      reset({
        fullname: data.name,
        sdt: data.phone,
        country: data.country || "",
        province: data.province || "",
        ward: data.ward || "",
        address: data.detail || "",
        setDefault: data.setDefault || false,
      });
      disableBodyScroll(bodyStyle);
      isLocked = true;
    } else {
      enableBodyScroll(bodyStyle);
      isLocked = false;
    }
  }, [showModal]);

  const handleDelete = () => {
    Swal.fire({
      title: "Xóa ",
      text: "Bạn có chắc chắn muốn xóa không ?",
      showCancelButton: true,
      icon: "question",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = {
            id: data_key,
          };
          dispatch(deleteAddress(data));
          Swal.fire("Xóa thành công");
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  const handleEdit = async (values) => {
    const dataEdit = {
      id: data_key,
      name: values.fullname,
      phone: values.sdt,
      country: values.country,
      province: values.province,
      ward: values.ward,
      detail: values.address,
      setDefault: values.setDefault || false,
    };
    try {
      const resultAction = await dispatch(editAddress(dataEdit));
      unwrapResult(resultAction);
      toast.dismiss();
      toast.success("Cập nhật địa chỉ thành công", { pauseOnHover: false });
      setShowModal(false);
      if (onClose) onClose();
    } catch (error) {
      toast.error(error?.message || "Không thể cập nhật địa chỉ");
      console.error("Edit address error:", error);
    }
  };

  const handleDefault = (data_key) => {
    const dataKey = {
      id: data_key,
    };
    try {
      dispatch(setAddressDefault(dataKey));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Chỉ hiển thị address item nếu không phải modal chỉnh sửa từ payment page */}
      {!onClose && (
      <div className="w-full bg-white border-2 border-dotted text-black px-3 sm:px-5 py-3 sm:py-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between my-3 sm:my-7 gap-3 sm:gap-0 focus:border-solid">
        <div className="flex flex-col justify-between w-full sm:w-auto">
          <div className="flex items-center gap-x-2 sm:gap-x-5 mb-2 flex-wrap">
            <h3 className="font-medium text-xs sm:text-sm md:text-base">{data.name}</h3>
            {data.setDefault && (
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 rounded-md font-medium text-xs">
                Mặc định
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm font-normal break-words">
              Địa chỉ: {data.detail} , {data.ward}, {data.province}{data.country ? `, ${data.country}` : ""}
            </span>
            <span className="text-xs sm:text-sm font-normal">
              Điện thoại: {data.phone}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-start gap-x-2 w-full sm:w-auto flex-wrap">
          {!data.setDefault && (
            <button
              className="border-2 border-solid px-1.5 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm text-green-400 font-medium border-green-400 rounded-lg whitespace-nowrap"
              type="button"
              onClick={() => handleDefault(data_key)}
            >
              Mặc định
            </button>
          )}

          <button
            className="border-2 border-solid px-1.5 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm text-blue-400 font-medium border-blue-400 rounded-lg whitespace-nowrap"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Sửa
          </button>
          <button
            className="border-2 border-solid px-1.5 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm text-red-600 font-medium border-red-600 rounded-lg whitespace-nowrap"
            type="button"
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </div>
      )}

      <ModalAdvanced
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        bodyClassName="w-11/12 sm:w-3/4 md:w-2/3 lg:w-[750px] bg-white rounded-lg relative z-10 content overflow-y-auto max-h-[90vh]"
      >
        <div className="max-h-[85vh] overflow-x-hidden px-4 sm:px-8 md:px-10 py-3 sm:py-5">
          <h3 className="text-base sm:text-lg font-semibold text-black text-left mb-3">
            Thông tin người nhận hàng
          </h3>
          <form autoComplete="off" onSubmit={handleSubmit(handleEdit)}>
            <div className="flex flex-col items-start gap-2 sm:gap-4 mb-4 sm:mb-5">
              <Label htmlFor="fullname">* Họ tên</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Mời bạn nhập tên của bạn"
                control={control}
              ></Input>
              {errors.fullname && (
                <p className="text-red-500 text-base font-medium">
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
                dropdownLabel={data.country || "Chọn quốc gia"}
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
                onClick={() => {
                  setShowModal(false);
                  if (onClose) onClose();
                }}
              >
                Hủy
              </button>
              <Button
                type="submit"
                height="40px sm:h-[50px]"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <span className="text-xs sm:text-sm md:text-base font-medium">Lưu</span>
              </Button>
            </div>
          </form>
        </div>
      </ModalAdvanced>
    </>
  );
};

export default ItemAddress;
