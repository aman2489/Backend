import { useContext, useEffect } from "react";
import { AuthContext } from "../authContext";
import { register, login, logout, getMe } from "../services/auth.api";


export function useAuth() {
    const context = useContext(AuthContext);

    const {user, loading, setUser, setLoading} = context;

    const handleRegister = async (username, email, password) => {
        setLoading(true);

        const data = await register(username, email, password);
        
        setUser(data);
        
        setLoading(false);

        return data;
    }

    const handleLogin = async (username, password) => {
        setLoading(true);

        const data = await login(username, password);

        setUser(data.user.username);

        setLoading(false);

        return(data);
    }

    const handleLogout = async () => {
        setLoading(true);

        const data = await logout();

        setUser(null);

        setLoading(false);
        
        return data;
    }

    const handleGetMe = async() => {
        setLoading(true);

        const data = await getMe();

        setUser(data);

        setLoading(false);
    } 

    useEffect(() => {
        handleGetMe();
    }, [])

    return {user, loading, handleLogin, handleRegister}
}