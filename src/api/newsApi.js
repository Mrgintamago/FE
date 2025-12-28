import axiosClient from "./axiosClient";

const newsApi = {
  getAllNews(params) {
    const url = "/api/v1/news";
    return axiosClient.get(url, { params });
  },
  getNews(id) {
    const url = `/api/v1/news/${id}`;
    return axiosClient.get(url);
  },
};

export default newsApi;

