import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import newsApi from "../../api/newsApi";
import Skeleton from "../../components/skeleton/Skeleton";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await newsApi.getNews(id);
        if (response.data && response.data.data) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-10">
        <Skeleton className="w-full h-64 mb-6" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container py-10">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
          <button
            onClick={() => navigate("/about/news")}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Quay lại danh sách tin tức
          </button>
        </div>
      </div>
    );
  }

  const date = news.createdAt 
    ? new Date(news.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : news.publishedAt 
    ? new Date(news.publishedAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "";

  return (
    <div className="container py-10">
      <button
        onClick={() => navigate("/about/news")}
        className="text-red-600 hover:text-red-700 font-semibold mb-6 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Quay lại
      </button>

      <article className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>
        
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          {news.author && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              <span>{news.author.name || "Admin"}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-4.5 0V9.75m-4.5 0v9m-4.5 0v-9m4.5 0V9.75" />
              </svg>
              <span>{date}</span>
            </div>
          )}
          {news.views !== undefined && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{news.views} lượt xem</span>
            </div>
          )}
        </div>

        {news.images && news.images.length > 0 && (
          <div className="mb-8">
            {news.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${news.title} - ${index + 1}`}
                className="w-full rounded-lg mb-4 object-cover"
                style={{ maxHeight: "600px" }}
              />
            ))}
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </article>
    </div>
  );
};

export default NewsDetailPage;

