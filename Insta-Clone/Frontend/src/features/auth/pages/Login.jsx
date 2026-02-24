import { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const { handleLogin, loading } = useAuth();

    if(loading){
      return(
        <h1>Loading...</h1>
      )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleLogin(username, password).then(res => {
          console.log(res);
          setUsername("");
          setPassword("");
          navigate("/");
        })
        
    }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="username" 
          placeholder="Enter username" 
          onInput={(e) => {setUsername(e.target.value)}}
          value={username}
          />
          <input 
          type="password" 
          name="password" 
          placeholder="Enter password" 
          onInput={(e) => {setPassword(e.target.value)}}
          value={password}
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  );
};

export default Login;
