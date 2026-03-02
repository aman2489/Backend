import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";



const Login = () => {

  const {loading, user, handleLogin} = useAuth()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleLogin(username, password);
    navigate("/");
  };

  if(loading){
    return(
      <main>
        <h1>Loading....</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            required
            value={username}
            onInput={(e) => {setUsername(e.target.value)}}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            value={password}
            onInput={(e) => {setPassword(e.target.value)}}
          />
          <button type="submit" className="btn primary-btn">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register">Create One.</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
