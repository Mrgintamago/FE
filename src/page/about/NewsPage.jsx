import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import newsApi from "../../api/newsApi";
import Skeleton from "../../components/skeleton/Skeleton";

const NewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await newsApi.getAllNews({ 
          status: "published",
          sort: "-createdAt"
        });
        if (response.data && response.data.data) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

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

