import React, { useEffect } from "react";
import ItemAddress from "./ItemAddress";
import { useDispatch, useSelector } from "react-redux";
import { action_status } from "../../utils/constants/status";
import { getAddress, refresh } from "../../redux/auth/addressSlice";
import LoadingPage from "../../components/loading/LoadingPage";
import Skeleton from "../../components/skeleton/Skeleton";

const ListAddress = () => {
  const { status, updateAddress, add, deleteAddress, address } = useSelector(
    (state) => state.address
  );

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getAddress());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      if (add) {
        dispatch(getAddress());
        dispatch(refresh());
      }
      if (deleteAddress) {
        dispatch(getAddress());
        dispatch(refresh());
      }
      if (updateAddress) {
        dispatch(getAddress());
        dispatch(refresh());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [add, deleteAddress, updateAddress]);

  return (
    <>
      {status === action_status.LOADING && (
        <>
          <div className="w-full bg-white border-2 border-dotted px-3 sm:px-5 py-3 sm:py-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between my-4 sm:my-7 focus:border-solid">
            <div className="flex flex-col justify-between gap-y-2 sm:gap-y-3 w-full">
              <div className="flex items-center gap-x-2 sm:gap-x-5 mb-2 flex-wrap">
                <Skeleton className="w-[70px] sm:w-[100px] h-3 sm:h-4 rounded-md" />
                <Skeleton className="w-[70px] sm:w-[100px] h-3 sm:h-4 rounded-md" />
              </div>
              <Skeleton className="w-full sm:w-[600px] h-3 sm:h-4 rounded-md" />
              <Skeleton className="w-4/5 sm:w-[250px] h-3 sm:h-4 rounded-md" />
            </div>
          </div>
          <div className="w-full bg-white border-2 border-dotted px-3 sm:px-5 py-3 sm:py-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between my-4 sm:my-7 focus:border-solid">
            <div className="flex flex-col justify-between gap-y-2 sm:gap-y-3 w-full">
              <div className="flex items-center gap-x-2 sm:gap-x-5 mb-2 flex-wrap">
                <Skeleton className="w-[70px] sm:w-[100px] h-3 sm:h-4 rounded-md" />
                <Skeleton className="w-[70px] sm:w-[100px] h-3 sm:h-4 rounded-md" />
              </div>
              <Skeleton className="w-full sm:w-[600px] h-3 sm:h-4 rounded-md" />
              <Skeleton className="w-4/5 sm:w-[250px] h-3 sm:h-4 rounded-md" />
            </div>
          </div>
        </>
      )}
      {status === action_status.SUCCEEDED &&
        address.length > 0 &&
        address.map((item, index) => (
          <ItemAddress data={item} key={index} data_key={index} />
        ))}
      {address.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] bg-white rounded-lg p-4 sm:p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 animate-bounce mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm sm:text-base md:text-lg font-medium text-center px-2">
            Chưa có địa chỉ. Vui lòng thêm địa chỉ mới
          </span>
        </div>
      )}
    </>
  );
};

export default ListAddress;
