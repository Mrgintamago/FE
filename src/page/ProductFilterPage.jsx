import React, { useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FilterProduct from "../module/filter/FilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { action_status } from "../utils/constants/status";
import { useEffect } from "react";
import { getBrand, getCategory, getProductFilter } from "../redux/product/productSlice";
import { useState } from "react";
import Pagination from "react-js-pagination";
import FilterSort from "../module/filter/FilterSort";
import queryString from "query-string";
import FilterPrice from "../module/filter/FilterPrice";
import Accordion from "../components/accordion/Accordion";
import Filter from "../components/filter/Filter";
import BackToTopButton from "../components/backtotop/BackToTopButton";
import Skeleton from "../components/skeleton/Skeleton";
import SkeletonItem from "../components/skeleton/SkeletonItem";

const ProductFilterPage = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { productFilter, statusFilter, totalPageFilter, statusBrand, brand, statusCategory, category } =
    useSelector((state) => state.product);
  const keyword = localStorage.getItem("keyword");

  const queryParams = useMemo(() => {
    const result = {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: 20,
      sort: params.sort || "ratingsAverage,-ratingsQuantity",
    };
    // Chỉ thêm filter giá nếu người dùng đã chọn (không phải giá trị mặc định)
    if (params.promotion_gte && params.promotion_gte !== "0") {
      result.promotion_gte = params.promotion_gte;
    }
    if (params.promotion_lte && params.promotion_lte !== "100000000") {
      result.promotion_lte = params.promotion_lte;
    }
    return result;
  }, [location.search]);

  const [page, setPage] = useState(queryParams.page);
  const [sort, setSort] = useState(queryParams.sort);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local sort for price ascending/descending using effective price (promotion nếu có, không thì price)
  const sortedData = useMemo(() => {
    if (!Array.isArray(productFilter)) return [];
    const data = [...productFilter];
    const effectivePrice = (p) =>
      typeof p?.promotion === "number" && p.promotion > 0 ? p.promotion : p?.price || 0;

    if (sort === "promotion") {
      return data.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    }
    if (sort === "-promotion") {
      return data.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    }
    return data;
  }, [productFilter, sort]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      let filters = queryParams;
      if (keyword) {
        filters = {
          ...queryParams,
          keyword: keyword,
        };
      }
      dispatch(getProductFilter(filters));
      setSort(queryParams.sort);
    } catch (error) {
      console.log(error.message);
    }
  }, [location.search]);

  useEffect(() => {
    try {
      if (statusBrand === action_status.IDLE) {
        dispatch(getBrand());
      }
      if (statusCategory === action_status.IDLE) {
        dispatch(getCategory());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, statusBrand, statusCategory]);

  const initFilter = {
    brand: params?.brand ? (Array.isArray(params.brand) ? params.brand : params.brand.split(",")) : [],
    category: params?.category ? (Array.isArray(params.category) ? params.category : params.category.split(",")) : [],
  };

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    let newFilter = { ...filter };
    
    if (checked) {
      switch (type) {
        case "Brands":
          newFilter = {
            ...filter,
            brand: [...filter.brand, item.id],
          };
          break;
        case "Categories":
          newFilter = {
            ...filter,
            category: [...filter.category, item.id],
          };
          break;
        default:
      }
    } else {
      switch (type) {
        case "Brands":
          newFilter = {
            ...filter,
            brand: filter.brand.filter((e) => e !== item.id),
          };
          break;
        case "Categories":
          newFilter = {
            ...filter,
            category: filter.category.filter((e) => e !== item.id),
          };
          break;
        default:
      }
    }
    
    // Apply filter ngay lập tức
    setFilter(newFilter);
    
    // Tạo filters object để update URL
    const filters = { ...queryParams, page: 1 };
    
    // Thêm hoặc xóa brand filter
    if (newFilter.brand.length > 0) {
      filters.brand = newFilter.brand.join(",");
    } else {
      delete filters.brand;
    }
    
    // Thêm hoặc xóa category filter
    if (newFilter.category.length > 0) {
      filters.category = newFilter.category.join(",");
    } else {
      delete filters.category;
    }
    
    // Navigate với filter mới
    navigate({
      pathname: "/product",
      search: queryString.stringify(filters, {
        skipNull: true,
        skipEmptyString: true,
      }),
    });
  };

  const handlePageClick = (values) => {
    setPage(values);
    const filters = {
      ...queryParams,
      page: values,
    };
    navigate({
      pathname: "/product",
      search: queryString.stringify(filters),
    });
  };

  const handleClickSort = (values) => {
    setSort(values);
    setPage(1);
  };

  const handleChangePrice = (values) => {
    const filters = { ...queryParams, ...values, page: 1 };
    setPage(1);
    navigate({
      pathname: "/product",
      search: queryString.stringify(filters),
    });
  };

  // Sync filter state với URL params khi URL thay đổi từ bên ngoài (như price filter)
  useEffect(() => {
    const currentBrands = params?.brand ? (Array.isArray(params.brand) ? params.brand : params.brand.split(",")) : [];
    const currentCategories = params?.category ? (Array.isArray(params.category) ? params.category : params.category.split(",")) : [];
    
    // Chỉ update nếu khác với state hiện tại (tránh infinite loop)
    const brandsChanged = JSON.stringify([...currentBrands].sort()) !== JSON.stringify([...filter.brand].sort());
    const categoriesChanged = JSON.stringify([...currentCategories].sort()) !== JSON.stringify([...filter.category].sort());
    
    if (brandsChanged || categoriesChanged) {
      setFilter({
        brand: currentBrands,
        category: currentCategories,
      });
    }
  }, [location.search]);

  return (
    <>
      <div className="mt-10">
        <div className="container">
          {" "}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xs sm:text-sm md:text-base text-[#a8b4c9] flex items-center font-medium"
            >
              Trang chủ
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 sm:w-5 h-4 sm:h-5 mx-2 sm:mx-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
            <span className="text-xs sm:text-sm md:text-base text-[#a8b4c9] font-medium">
              Mô hình figure
            </span>
          </div>
          <div className="wrapper-product flex flex-col lg:flex-row gap-4 lg:gap-6">
            {(statusBrand === action_status.LOADING || statusCategory === action_status.LOADING) && (
              <>
                <div className="hidden lg:flex product-filter w-full lg:w-64 flex-shrink-0 bg-white rounded-lg flex-col items-start">
                  <Skeleton className="h-3 w-1/2 rounded-lg ml-4" />
                  <div className="flex items-center justify-between p-4">
                    <Skeleton className="h-2 w-1/4 rounded-md" />
                    <Skeleton className="h-2 w-1/4 rounded-md" />
                  </div>
                  <div className="flex items-center justify-between px-4">
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                  </div>
                  <Skeleton className="h-3 w-[250px] rounded-lg m-4" />
                  <div className="flex flex-col m-4">
                    <Skeleton className="h-3 w-1/2 rounded-md " />
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                  </div>
                  <div className="flex flex-col m-4">
                    <Skeleton className="h-3 w-1/2 rounded-md " />
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                  </div>
                  <div className="flex flex-col m-4">
                    <Skeleton className="h-3 w-1/2 rounded-md " />
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                  </div>
                  <div className="flex flex-col m-4">
                    <Skeleton className="h-3 w-1/2 rounded-md " />
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Skeleton className="w-4 h-4 rounded-md" />
                      <Skeleton className="w-1/2 h-3 rounded-md" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {(statusBrand === action_status.SUCCEEDED || statusBrand === action_status.FAILED) && 
             (statusCategory === action_status.SUCCEEDED || statusCategory === action_status.FAILED) && (
              <>
                <div className="hidden lg:flex product-filter w-full lg:w-64 flex-shrink-0 bg-white rounded-lg flex-col text-black">
                  <FilterPrice onChange={handleChangePrice} />
                  <Accordion title="Nhà cung cấp" className="true">
                    {category && category.length > 0 ? (
                      category.map((item) => {
                        return (
                          <Filter
                            label={item.name}
                            key={item.id}
                            onChange={(input) => {
                              filterSelect("Categories", input.checked, item);
                            }}
                            checked={filter.category.includes(item.id)}
                          />
                        );
                      })
                    ) : (
                      <div className="px-5 py-2 text-xs sm:text-sm text-gray-500">Chưa có nhà cung cấp</div>
                    )}
                  </Accordion>
                  <Accordion title="Thương hiệu" className="true">
                    {brand && brand.length > 0 ? (
                      brand.map((item) => {
                        return (
                          <Filter
                            label={item.name}
                            key={item.id}
                            onChange={(input) => {
                              filterSelect("Brands", input.checked, item);
                            }}
                            checked={filter.brand.includes(item.id)}
                          />
                        );
                      })
                    ) : (
                      <div className="px-5 py-2 text-xs sm:text-sm text-gray-500">Chưa có thương hiệu</div>
                    )}
                  </Accordion>
                </div>
              </>
            )}

            <div className="flex-1 product-list">
              {statusFilter === action_status.LOADING && (
                <div className="flex flex-col container rounded-lg bg-white">
                  <div className="flex items-center p-5 gap-x-5">
                    <Skeleton className="w-[100px] h-5 rounded-md" />
                    <Skeleton className="w-[80px] h-5 rounded-md" />
                    <Skeleton className="w-[80px] h-5 rounded-md" />
                  </div>

                  <SkeletonItem className="my-5 grid-cols-4" totalItem={4} />
                  <SkeletonItem className="my-5 grid-cols-4" totalItem={4} />
                  <SkeletonItem className="my-5 grid-cols-4" totalItem={4} />
                </div>
              )}
              {statusFilter === action_status.SUCCEEDED && (
                <>
                  <div className="flex flex-col container rounded-lg bg-white ">
                  <div className="flex flex-col sm:flex-row sm:items-center p-3 sm:p-5 gap-3 sm:gap-5 ">
                    <span className="font-medium text-xs sm:text-sm md:text-base ">
                      Sắp xếp theo
                    </span>
                    <FilterSort onChange={handleClickSort} />
                    </div>
                <FilterProduct data={sortedData} />
                  </div>
                  <div className="flex justify-center items-center mt-2">
                    <Pagination
                      activePage={page}
                      nextPageText={">"}
                      prevPageText={"<"}
                      totalItemsCount={totalPageFilter}
                      itemsCountPerPage={1}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      linkClass="page-num"
                      onChange={handlePageClick}
                    />
                  </div>
                </>
              )}
              {statusFilter === action_status.FAILED && (
                <div className="min-h-[400px] sm:h-[500px] lg:h-[700px] bg-white flex items-center justify-center flex-col gap-y-4 sm:gap-y-6 px-4">
                  <img
                    src="../images/search.png"
                    alt=""
                    className="w-32 sm:w-48 md:w-[200px]"
                  />
                  <span className="text-base sm:text-lg md:text-xl font-medium text-center">
                    Không tìm thấy sản phẩm nào
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </>
  );
};

export default ProductFilterPage;
