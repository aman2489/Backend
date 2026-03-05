import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import FormGroup from "../components/FormGroup";


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
    <>
      <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            required
          />
          <FormGroup
          label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            required
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
    </>
  );
};

export default Login;
