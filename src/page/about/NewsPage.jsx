import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import newsApi from "../../api/newsApi";
import Skeleton from "../../components/skeleton/Skeleton";

const NewsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0
  });
  
  const ITEMS_PER_PAGE = 5;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await newsApi.getAllNews({ 
          status: "published",
          sort: "-createdAt",
          page: currentPage,
          limit: ITEMS_PER_PAGE
        });
        if (response.data && response.data.data) {
          setNews(response.data.data);
          setPagination({
            currentPage: currentPage,
            totalPages: Math.ceil(response.data.totalResults / ITEMS_PER_PAGE) || 1,
            totalResults: response.data.totalResults || response.data.data.length
          });
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Nút Previous
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className={`px-3 py-2 rounded-lg border ${
          pagination.currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
      >
        ←
      </button>
    );

    // Trang đầu
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 py-2 text-gray-500">...</span>
        );
      }
    }

    // Các trang giữa
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-lg border ${
            i === pagination.currentPage
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Trang cuối
    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 py-2 text-gray-500">...</span>
        );
      }
      pages.push(
        <button
          key={pagination.totalPages}
          onClick={() => handlePageChange(pagination.totalPages)}
          className="px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        >
          {pagination.totalPages}
        </button>
      );
    }

    // Nút Next
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className={`px-3 py-2 rounded-lg border ${
          pagination.currentPage === pagination.totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
      >
        →
      </button>
    );

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {pages}
      </div>
    );
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Tin tức & Bài báo</h1>
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-48 rounded-lg" />
          ))}
        </div>
      ) : news.length > 0 ? (
        <div className="space-y-6">
          {news.map((item) => {
            // Lấy text thuần từ HTML content để làm excerpt
            const textContent = item.content?.replace(/<[^>]*>/g, "").trim() || "";
            const excerpt = textContent.length > 200 
              ? textContent.substring(0, 200) + "..." 
              : textContent;
            const date = item.createdAt 
              ? new Date(item.createdAt).toLocaleDateString("vi-VN")
              : new Date(item.publishedAt).toLocaleDateString("vi-VN");
            
            return (
              <div 
                key={item._id} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/about/news/${item._id}`)}
              >
                {item.images && item.images.length > 0 && (
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-3">{date}</p>
                <div 
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />
                <button 
                  className="mt-4 text-red-600 hover:text-red-700 font-semibold"
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
          
          {/* Phân trang */}
          {renderPagination()}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Chưa có tin tức nào được đăng
        </div>
      )}
    </div>
  );
};

export default NewsPage;

