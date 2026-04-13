import { setUser, setLoading, setError } from "../state/auth.slice";
import { register, login } from "../services/auth.api";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ email, password, fullname, contact, isSeller = false,}) {
    try{
      const data = await register({email, password, contact, fullname, isSeller,});
      dispatch(setUser(data.user));
    }catch(error){
      dispatch(setError(error));
      throw error;
    }
  }

  async function handleLogin({ email, password }) {
    try{
      const data = await login({email, password});
      dispatch(setUser(data.user));
    }catch(error){
      dispatch(setError(error));
      throw error;
    }
  }

  return {
    handleRegister,
    handleLogin,
  };
};

export default useAuth;
