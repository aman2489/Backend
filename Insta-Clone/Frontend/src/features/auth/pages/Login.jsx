import { use, useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const { handleLogin, loading } = useAuth();

    if(loading){
      return(
        <main>
          <h1>Loading...</h1>
        </main>
      )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = await handleLogin(username, password);

        console.log("User logged in.", user);
        
        navigate("/");
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
          <button type="submit" className="button primary-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Create One.</Link></p>
      </div>
    </main>
  );
};

export default Login;
