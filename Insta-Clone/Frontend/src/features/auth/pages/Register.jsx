import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const {handleRegister, loading} = useAuth();

    if(loading){
      return(
        <main>
          <h1>Loading...</h1>
        </main>
      )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = await handleRegister(username, email, password);

        console.log("User Registered Successfully.", user);

        navigate("/");
    }

  return (
    <main>
        <div>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="username" 
                placeholder="Enter username"
                onInput={(e) => {setUsername(e.target.value)}}
                value={username}
                required
                />
                <input 
                type="text" 
                name="email" 
                placeholder="Enter email"
                onInput={(e) => {setEmail(e.target.value)}}
                value={email}
                required
                />
                <input 
                type="password" 
                name="password"
                placeholder="Enter password"
                onInput={(e) => {setPassword(e.target.value)}}
                value={password}
                required
                />
                <button type="submit" className="button primary-button">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login to account.</Link></p>
        </div>
        </div>
    </main>
  )
}

export default Register
