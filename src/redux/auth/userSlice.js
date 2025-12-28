import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import axiosClient from "../../api/axiosClient";
import { action_status } from "../../utils/constants/status";
import StorageKeys from "../../utils/constants/storage-keys";
import { fetchCSRFToken } from "../../api/axiosClient";

// Helper function to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Helper to extract token from response OR cookies
function saveTokenToLocalStorage(response) {
  const token = response?.accessToken || response?.token;
  if (token && token !== "undefined") {
    localStorage.setItem(StorageKeys.TOKEN, token);
    // Update axiosClient header immediately
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("❌ No token in response. accessToken:", response?.accessToken, "| token:", response?.token);
    console.warn("📦 Full response:", response);
  }
}

export const register = createAsyncThunk("user/register", async (payload) => {
  const response = await userApi.register(payload);
  saveTokenToLocalStorage(response);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
  
  // Fetch CSRF token after successful registration
  try {
    await fetchCSRFToken();
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
  
  return response.data.user;
});

export const verify = createAsyncThunk("user/verify", async (payload) => {
  const response = await userApi.verify(payload);
  localStorage.setItem("tokenStream", response.tokenStream);
  saveTokenToLocalStorage(response);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
  
  // Fetch CSRF token after successful verification
  try {
    await fetchCSRFToken();
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
  
  return response.data.user;
});

export const resendVerifyCode = createAsyncThunk("user/resendVerifyCode", async () => {
  const response = await userApi.resendVerifyCode();
  if (response.tokenStream) {
    localStorage.setItem("tokenStream", response.tokenStream);
  }
  saveTokenToLocalStorage(response);
  if (response.data?.user) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
  }
  return response;
});

export const changeState = createAsyncThunk(
  "user/changeState",
  async (payload) => {
    const response = await userApi.changeState(payload);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    return response.data.user;
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload) => {
    const response = await userApi.resetPassword(payload, payload.token);
    localStorage.setItem("tokenStream", response.tokenStream);
    saveTokenToLocalStorage(response);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    return response.data.user;
  }
);

export const forgotPassword = createAsyncThunk(
  "user/fotgotPassword",
  async (payload) => {
    const response = await userApi.forgotPassword(payload);
    return response.data.user;
  }
);

export const verifyResetPassword = createAsyncThunk(
  "user/verifyResetPassword",
  async (payload) => {
    const response = await userApi.verifyResetPassword(payload);
    return response;
  }
);

export const login = createAsyncThunk("user/login", async (payload) => {
  // Clear any old tokens before login to avoid blacklist rejection
  localStorage.removeItem(StorageKeys.TOKEN);
  localStorage.removeItem("jwt");
  
  const response = await userApi.login(payload);
  if (response.tokenStream) {
    localStorage.setItem("tokenStream", response.tokenStream);
  }
  saveTokenToLocalStorage(response);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
  
  // Fetch CSRF token after successful login
  try {
    await fetchCSRFToken();
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
  
  return response.data.user;
});

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (payload) => {
    const response = await userApi.loginWithGoogle(payload);
    localStorage.setItem("tokenStream", response.tokenStream);
    saveTokenToLocalStorage(response);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    
    // Fetch CSRF token after successful login
    try {
      await fetchCSRFToken();
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
    
    return response.data.user;
  }
);

export const updateInfoUser = createAsyncThunk(
  "user/updateInfoUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUser(payload);
      // Update user data in storage
      if (response.data && response.data.user) {
        localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
        // Also update sessionStorage if it exists
        const sessionUser = sessionStorage.getItem(StorageKeys.USER);
        if (sessionUser) {
          sessionStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
        }
      }
      // Only update token if it's returned (updateMe doesn't return token)
      if (response.accessToken || response.token) {
        saveTokenToLocalStorage(response);
      } else {
        // Try to get from cookies if not in response
        const jwtFromCookie = getCookie('jwt');
        if (jwtFromCookie) {
          localStorage.setItem(StorageKeys.TOKEN, jwtFromCookie);
        }
      }
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Có lỗi xảy ra khi cập nhật thông tin";
      return rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await userApi.getUser();
  return response.data.data;
});

const initialState = {
  current:
    JSON.parse(localStorage.getItem(StorageKeys.USER)) ||
    JSON.parse(sessionStorage.getItem(StorageKeys.USER)) ||
    null,
  status: action_status.IDLE,
  user: {},
  update: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem("order");
      localStorage.removeItem("keyword");
      localStorage.removeItem("tokenStream");
      localStorage.removeItem("jwt");
      sessionStorage.removeItem(StorageKeys.TOKEN);
      sessionStorage.removeItem(StorageKeys.USER);
      sessionStorage.removeItem("tokenStream");
      
      // Remove Authorization header from axios
      delete axiosClient.defaults.headers.common["Authorization"];
      
      state.current = null;
    },
    refresh: (state, action) => {
      state.update = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.current = action.payload;
        state.user = action.payload;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(changeState.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = action_status.SUCCEEDED;
        state.user = action.payload;
        state.current = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = action_status.FAILED;
      })
      .addCase(updateInfoUser.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(updateInfoUser.fulfilled, (state, action) => {
        state.update = true;
        state.current = action.payload;
        state.user = action.payload;
        state.status = action_status.SUCCEEDED;
      })
      .addCase(updateInfoUser.rejected, (state, action) => {
        state.status = action_status.FAILED;
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout, refresh } = actions;
export default reducer;
