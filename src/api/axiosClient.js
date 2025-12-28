import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

console.log("📡 API Base URL:", apiBaseURL);
console.log("🌍 Environment:", import.meta.env.MODE);

const axiosClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

// Set initial token if available
const initialToken = localStorage.getItem("jwt");
if (initialToken) {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
  console.log("🔐 Initial token set to axios defaults");
}

// Store CSRF token
let csrfToken = null;

// Function to fetch CSRF token from server
export const fetchCSRFToken = async () => {
  try {
    const response = await axiosClient.get("/api/csrf-token");
    csrfToken = response.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error.message);
    return null;
  }
};

axiosClient.interceptors.request.use(
  function (config) {
    // Enable credentials (cookies) for all requests to Vercel backend
    config.withCredentials = true;
    
    // Gắn token từ localStorage hoặc sessionStorage
    const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
      console.debug("✅ Token attached to request:", config.method?.toUpperCase(), config.url, "| Token preview:", token.substring(0, 20) + "...");
    } else {
      console.debug("⚠️ No token found for request:", config.method?.toUpperCase(), config.url);
      console.debug("📦 localStorage keys:", Object.keys(localStorage));
    }

    // SECURITY: Gắn CSRF token từ cookie hoặc memory cho state-changing requests
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(config.method?.toUpperCase())) {
      let tokenToUse = getCookie('XSRF-TOKEN') || csrfToken;
      
      if (tokenToUse) {
        config.headers['X-CSRF-Token'] = tokenToUse;
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Helper function to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (!error.response) {
      // Network error or no response from server
      return Promise.reject(error);
    }
    const { config, status, data } = error.response;
    const URLs = [
      "/api/v1/users/signup",
      "/api/v1/users/login",
      "/api/v1/users/verify",
      "/api/v1/users/forgotPassword",
      "/api/v1/users/changeState",
      "/api/v1/users/logout",
      "/api/v1/users/verifyResetPass",
      "/api/v1/users/me",
      "/api/v1/api/v1/users/resetPassword/:token",
      "/api/v1/users/updateMe",
      "/api/v1/users/createAddress",
      "/api/v1/users/me/address",
      "/api/v1/users/deleteAddress",
      "/api/v1/users/updateAddress",
      "/api/v1/users/updateMyPassword",
      "/api/v1/users/setDefaultAddress",
      "/api/v1/products",
      "/api/v1/reviews",
      "/api/v1/products/:id/reviews",
      "/api/v1/reviews/:id",
      "/api/v1/orders",
      "/api/v1/users/userLoginWith",
      "/api/v1/comments",
      "/api/v1/products/:id/comments?query",
      "/api/v1/comments/:id",
      "/api/v1/comments/setLike/:id",
    ];
    if (
      (URLs.includes(config.url) && status === 500) ||
      status == 400 ||
      status == 401 ||
      status == 404 ||
      status == 403
    ) {
      throw new Error(data.message);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
