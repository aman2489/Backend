import { useDispatch } from "react-redux";
import { register, login, getMe } from "../services/auth.api";
import { setUser, setloading, setError } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setloading(true));
      const data = await register({ email, username, password });
      return data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(setloading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setloading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
    } finally {
      dispatch(setloading(false));
    }
  }

  async function handleGetme() {
    try {
      dispatch(setloading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to fetch user details",
        ),
      );
    } finally {
      dispatch(setloading(false));
    }
  }

  return {
    handleGetme,
    handleLogin,
    handleRegister,
  };
}
