import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com"
})

// axiosInstance.interceptors.request.use()

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("axios instance response->", response.data);
        return response;
    },
    (error) => {
        console.log("error in instance", error);
    }
)