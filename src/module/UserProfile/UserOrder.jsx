import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import DashboardHeading from "../dashboard/DashboardHeding";
import { formatPrice } from "../../utils/formatPrice";
import { useSelector, useDispatch } from "react-redux";
import { getOrder, refresh, cancelOrder } from "../../redux/order/orderSlice";
import { useEffect } from "react";
import { action_status } from "../../utils/constants/status";
import { format } from "date-fns";
import { useState } from "react";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import Skeleton from "../../components/skeleton/Skeleton";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserOrder = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { status, totalPage } = useSelector((state) => state.order);
  const { current } = useSelector((state) => state.user);
  const { order, update } = useSelector((state) => state.order);

  const location = useLocation();
  const params = queryString.parse(location.search);
  const [state, setState] = useState(params.status);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (current === null) {
      toast.dismiss();
      toast.warning("Vui lòng đăng nhập");
      navigate("/sign-in");
    }
  }, [current]);

  useEffect(() => {
    try {
      const data = {
        id: current._id,
        page: page,
        status: state,
        limit: 5,
      };
      dispatch(getOrder(data));
      dispatch(refresh());
      setState(params.status);
    } catch (error) {
      console.log(error.message);
    }
  }, [page, state, params.status, update]);

  const handleClick = (e) => {
    setState(e.target.value);
    navigate(`/account/orders?status=${e.target.value}`);
    setPage(1);
  };

  const handlePageClick = (values) => {
    setPage(values);
  };

  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: "Chú ý",
      text: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      showCancelButton: true,
      icon: "question",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy bỏ",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          data: {
            status: "Cancelled",
          },
          id: orderId,
        };
        try {
          await dispatch(cancelOrder(data)).unwrap();
          toast.success("Hủy đơn hàng thành công");
          dispatch(refresh());
          // Reload danh sách đơn hàng
          const reloadData = {
            id: current._id,
            page: page,
            status: state,
            limit: 5,
          };
          dispatch(getOrder(reloadData));
        } catch (error) {
          console.log(error.message);
          toast.error("Có lỗi xảy ra khi hủy đơn hàng");
        }
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Quản lý đơn hàng"
          className="px-5 py-5"
        ></DashboardHeading>
        <div className="flex items-center gap-x-3 flex-wrap">
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300 ${
              state === "All" || state === undefined
                ? "bg-blue-500 text-white"
                : ""
            }`}
            value="All"
            onClick={handleClick}
          >
            Tất cả đơn hàng
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300 ${
              state === "Processed" ? "bg-blue-500 text-white" : ""
            }`}
            value="Processed"
            onClick={handleClick}
          >
            Chờ xác nhận
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300 ${
              state === "Waiting Goods" ? "bg-blue-500 text-white" : ""
            }`}
            value="Waiting Goods"
            onClick={handleClick}
          >
            Chờ lấy hàng
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300 ${
              state === "Delivery" ? "bg-blue-500 text-white" : ""
            }`}
            value="Delivery"
            onClick={handleClick}
          >
            Chờ giao hàng
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4  text-base font-medium rounded-lg border border-gray-300 ${
              state === "Success" ? "bg-blue-500 text-white" : ""
            }`}
            value="Success"
            onClick={handleClick}
          >
            Đã giao
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300  ${
              state === "Cancelled" ? "bg-blue-500 text-white" : ""
            }`}
            value="Cancelled"
            onClick={handleClick}
          >
            Đã hủy
          </button>
        </div>
      </div>

      {status === action_status.LOADING && (
        <>
          {" "}
          <Table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày mua</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {" "}
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-20 h-5 rounded-md" />
                </th>
              </tr>
              <tr>
                <th>
                  {" "}
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-20 h-5 rounded-md" />
                </th>
              </tr>
              <tr>
                <th>
                  {" "}
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-20 h-5 rounded-md" />
                </th>
              </tr>
            </tbody>
          </Table>
        </>
      )}
      {status === action_status.SUCCEEDED && (
        <>
          {order?.length === 0 && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào
              </span>
            </div>
          )}
          {order?.length > 0 && (
            <>
              {" "}
              <Table>
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày mua</th>
                    <th>Sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {(state === "All" || state === undefined) && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>
                            {item?.status === "Processed" && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-orange-400">
                                  Chờ xác nhận
                                </span>
                              </td>
                            )}
                            {item?.status === "Waiting Goods" && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-yellow-400">
                                  Chờ lấy hàng
                                </span>
                              </td>
                            )}
                            {item?.status === "Delivery" && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-blue-400">
                                  Chờ giao hàng
                                </span>
                              </td>
                            )}
                            {item?.status === "Cancelled" && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-red-400">
                                  Đã hủy
                                </span>
                              </td>
                            )}
                            {item?.status === "Success" && (
                              <td>
                                <span className="p-2 rounded-lg text-white  bg-green-400">
                                  Đã giao
                                </span>
                              </td>
                            )}
                            <td>
                              {(item?.status === "Processed" || item?.status === "Waiting Goods") && (
                                <button
                                  className="border-2 border-red-400 px-3 py-1 rounded-lg text-red-400 text-sm font-medium hover:text-red-600 hover:border-red-600 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelOrder(item._id);
                                  }}
                                >
                                  Hủy đơn
                                </button>
                              )}
                              {(item?.status === "Delivery" || 
                                item?.status === "Success" || 
                                item?.status === "Cancelled") && (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Processed" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>
                            <td>
                              <span className="p-2 rounded-lg text-white bg-orange-400">
                                Chờ xác nhận
                              </span>
                            </td>
                            <td>
                              <button
                                className="border-2 border-red-400 px-3 py-1 rounded-lg text-red-400 text-sm font-medium hover:text-red-600 hover:border-red-600 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelOrder(item._id);
                                }}
                              >
                                Hủy đơn
                              </button>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Cancelled" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>

                            <td>
                              <span className="p-2 rounded-lg text-white bg-red-400">
                                Đã hủy
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-400 text-sm">-</span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Success" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>

                            <td>
                              <span className="p-2 rounded-lg text-white  bg-green-400">
                                Đã giao
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-400 text-sm">-</span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Waiting Goods" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>
                            <td>
                              <span className="p-2 rounded-lg text-white bg-yellow-400">
                                Chờ lấy hàng
                              </span>
                            </td>
                            <td>
                              <button
                                className="border-2 border-red-400 px-3 py-1 rounded-lg text-red-400 text-sm font-medium hover:text-red-600 hover:border-red-600 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelOrder(item._id);
                                }}
                              >
                                Hủy đơn
                              </button>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Delivery" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>
                            <td>
                              <span className="p-2 rounded-lg text-white bg-blue-400">
                                Chờ giao hàng
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-400 text-sm">-</span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </Table>
              <div className="flex items-center justify-center mt-5">
                <Pagination
                  activePage={page}
                  nextPageText={">"}
                  prevPageText={"<"}
                  totalItemsCount={totalPage}
                  itemsCountPerPage={1}
                  firstPageText={"<<"}
                  lastPageText={">>"}
                  linkClass="page-num"
                  onChange={handlePageClick}
                />
              </div>
            </>
          )}
        </>
      )}
      {status === action_status.FAILED && (
        <>
          {(state === "All" || state === undefined) && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào
              </span>
            </div>
          )}
          {state === "Processed" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào chờ xác nhận
              </span>
            </div>
          )}
          {state === "Waiting Goods" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào chờ lấy hàng
              </span>
            </div>
          )}
          {state === "Delivery" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào chờ giao hàng
              </span>
            </div>
          )}
          {state === "Success" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào đã giao
              </span>
            </div>
          )}
          {state === "Cancelled" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào trong danh sách hủy
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserOrder;
