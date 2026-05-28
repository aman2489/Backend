import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"
import { axiosInstance } from "../config/axiosInstance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../state/Authreducer";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onRegister = async (data) => {
        try{
            const res = await axiosInstance.post("/api/auth/register", data);
            console.log("Response from register: ", res);
            dispatch(addUser(res.data.user));
            reset();
        }catch(err){
            console.log("Error in register: ", err);
        }
    }

    const onLogin = async (data) => {
        try{
            let res = await axiosInstance.post("/api/auth/login", data);
            console.log("Response from login: ", res);
            dispatch(addUser(res.data.user));
            reset();
        }catch(err){
            console.log("Error in login: ", err);
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        navigate,
        onLogin,
        onRegister
    }
}

export default useAuth;