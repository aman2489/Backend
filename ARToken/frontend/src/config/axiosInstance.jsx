import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// separate instance WITHOUT interceptor
const refreshApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalReq = error.config;

    if (
      error.response?.status === 401 &&
      !originalReq._retry
    ) {

      originalReq._retry = true;

      try {

        // IMPORTANT:
        // use refreshApi instead of axiosInstance
        await refreshApi.get("/api/auth/get-accessToken");

        return axiosInstance(originalReq);

      } catch (err) {

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);