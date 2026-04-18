import axios from "axios";

const api = axios.create({
    baseURL: "/api/auth",
    withCredentials: true
})

export async function register({email, password, contact, fullname, isSeller}) {
    try{
        const response = await api.post("/register", {email, contact, password, fullname, isSeller});
        return response.data;
    }catch(error){
        throw error?.response?.data?.message || "Registration failed!"
    }


}

export async function login({email, password}) {
    try{
        const response = await api.post("/login", {
            email, password
        });
        return response.data;
    }catch(error){
        throw error?.response?.data?.message || "Login failed!"
    }

}

export async function getMe() {
    try{
        const response = await api.get("/me");
        return response.data;
    }catch(error){
        throw error?.response?.data?.message || "Error fetching user!"
    }
}
