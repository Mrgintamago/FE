import React, { useEffect } from "react";
import Banner from "../components/banner/Banner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductListHome from "../module/product/ProductListHome";
import BestSellerListHome from "../module/product/BestSellerListHome";
import BackToTopButton from "../components/backtotop/BackToTopButton";
import ProductList from "../module/product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/product/productSlice";
import { action_status } from "../utils/constants/status";
import { useState } from "react";
import SkeletonItem from "../components/skeleton/SkeletonItem";
import Skeleton from "../components/skeleton/Skeleton";
import newsApi from "../api/newsApi";
import productApi from "../api/productApi";

// Hàm decode HTML entities đầy đủ
const decodeHtmlEntities = (text) => {
  if (!text) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, totalPage, product } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [bestSeller, setBestSeller] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loadingBestSeller, setLoadingBestSeller] = useState(true);
  const [loadingNewProducts, setLoadingNewProducts] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    function fetchDataProduct(page) {
      const limit = 10;
      const data = {
        page: page,
        limit: limit,
      };
      try {
        dispatch(getProduct(data));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchDataProduct(page);
  }, [page, dispatch]);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoadingNews(true);
        const response = await newsApi.getAllNews({ 
          status: "published",
          limit: 3,
          sort: "-createdAt"
        });
        if (response.data && response.data.data) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchBestSeller() {
      try {
        setLoadingBestSeller(true);
        const response = await productApi.getAllProduct("limit=10&sort=-ratingsAverage,-ratingsQuantity");
        if (response.data && response.data.data) {
          setBestSeller(Array.isArray(response.data.data) ? response.data.data : []);
        }
      } catch (error) {
        console.error("Error fetching best seller:", error);
      } finally {
        setLoadingBestSeller(false);
      }
    }
    fetchBestSeller();
  }, []);

  useEffect(() => {
    async function fetchNewProducts() {
      try {
        setLoadingNewProducts(true);
        const response = await productApi.getAllProduct("limit=10&sort=-createdAt");
        if (response.data && response.data.data) {
          setNewProducts(Array.isArray(response.data.data) ? response.data.data : []);
        }
      } catch (error) {
        console.error("Error fetching new products:", error);
      } finally {
        setLoadingNewProducts(false);
      }
    }
    fetchNewProducts();
  }, []);

  const handlePageClick = (values) => {
    setPage(values);
    window.scrollTo({
      top: 1750,
      behavior: "smooth",
    });
  };

  return (
    <>
      {status === action_status.LOADING && (
        <>
          <div className="container px-4 sm:px-6">
            <Skeleton className="w-full rounded-lg h-48 sm:h-80 lg:h-[400px] mt-6 sm:mt-10" />
          </div>
          <div className="container px-4 sm:px-6 w-full rounded-lg bg-gray-200 my-6">
            <SkeletonItem className="my-6 sm:my-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 p-3 sm:p-5" totalItem={4} />
          </div>
          <div className="container px-4 sm:px-6 w-full rounded-lg bg-gray-200 my-6">
            <SkeletonItem className="my-6 sm:my-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 p-3 sm:p-5" totalItem={4} />
          </div>
          <div className="my-12 sm:my-20">
            <div className="container px-4 sm:px-6 w-full rounded-lg bg-gray-200">
              <SkeletonItem className="my-4 sm:my-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 p-3 sm:p-5" totalItem={4} />
              <SkeletonItem className="my-4 sm:my-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 p-3 sm:p-5" totalItem={4} />
              <SkeletonItem className="my-4 sm:my-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 p-3 sm:p-5" totalItem={4} />
            </div>
            <div className="flex items-center justify-center container px-4 sm:px-6 gap-2 sm:gap-x-5 mt-6">
              <Skeleton className="w-4 sm:w-5 h-4 sm:h-5 rounded-md" />
              <Skeleton className="w-4 sm:w-5 h-4 sm:h-5 rounded-md" />
              <Skeleton className="w-4 sm:w-5 h-4 sm:h-5 rounded-md" />
              <Skeleton className="w-4 sm:w-5 h-4 sm:h-5 rounded-md" />
              <Skeleton className="w-4 sm:w-5 h-4 sm:h-5 rounded-md" />
            </div>
          </div>
        </>
      )}
      {status === action_status.SUCCEEDED && (
        <>
          <Banner />
          <div className="container px-4 sm:px-6 mt-6 sm:mt-8 lg:mt-10 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-x-2 sm:gap-x-3">
                <span className="w-1 sm:w-2 h-6 sm:h-8 bg-red-600 rounded-full block" />
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Tin tức & Bài báo</h2>
              </div>
              <button
                className="text-xs sm:text-sm md:text-base text-red-600 font-semibold hover:text-red-700 smooth-transition flex items-center gap-x-1"
                onClick={() => navigate("/about/news")}
              >
                Xem tất cả
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3 sm:w-4 h-3 sm:h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            {loadingNews ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-40 sm:h-48 rounded-lg" />
                ))}
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {news.map((item, index) => {
                  let textContent = item.content?.replace(/<[^>]*>/g, "").trim() || "";
                  textContent = decodeHtmlEntities(textContent)
                    .replace(/\s+/g, " ")
                    .trim();
                  
                  let title = item.title || "";
                  title = decodeHtmlEntities(title);
                  
                  const excerpt = textContent.length > 80 
                    ? textContent.substring(0, 80) + "..." 
                    : textContent;
                  const date = item.createdAt 
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                    : new Date(item.publishedAt).toLocaleDateString("vi-VN");
                  
                  return (
                    <div
                      key={item._id || index}
                      className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 shadow-lg border border-red-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up relative overflow-hidden cursor-pointer flex flex-col h-full"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => navigate(`/about/news/${item._id}`)}
                    >
                      <span className="absolute inset-x-0 top-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
                      {item.images && item.images.length > 0 && (
                        <img 
                          src={item.images[0]} 
                          alt={title || "News image"}
                          className="w-full h-24 sm:h-32 lg:h-40 object-cover rounded-lg mb-2 sm:mb-3 flex-shrink-0"
                          loading="lazy"
                        />
                      )}
                      <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 flex-shrink-0">{date}</p>
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-shrink-0 min-h-[2.5rem]">{title || "Không có tiêu đề"}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 flex-grow mb-2 sm:mb-3">{excerpt || "Không có nội dung"}</p>
                      <button
                        className="mt-auto text-red-600 hover:text-red-700 font-semibold smooth-transition flex-shrink-0 self-start text-xs sm:text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/about/news/${item._id}`);
                        }}
                      >
                        Đọc thêm →
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                Chưa có tin tức nào được đăng
              </div>
            )}
          </div>
          <BestSellerListHome 
            data={bestSeller} 
            className="py-8 sm:py-12 md:py-16 lg:py-20" 
            loading={loadingBestSeller}
          />
          <ProductListHome 
            data={newProducts} 
            bg="bg2" 
            className="py-8 sm:py-12 md:py-16 lg:py-20" 
            title="Sản phẩm mới về"
            loading={loadingNewProducts}
          />
          <ProductList
            data={product}
            handlePageClick={handlePageClick}
            page={page}
            totalPage={totalPage}
          />
          <BackToTopButton />
        </>
      )}
    </>
  );
};

export default HomePage;
