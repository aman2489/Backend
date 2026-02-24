import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import {login, register, getMe} from "../services/auth.api.js"

export function useAuth() {
    const context = useContext(AuthContext);

    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async (username, password) => {
        setLoading(true);

        const data = await login(username, password);

        setUser(data);

        setLoading(false);

        return data;
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);

        const data = await register(username, email, password);
        
        setUser(data);

        setLoading(false);

        return data;
    }

    return {
        user, loading, handleLogin, handleRegister
    }
}