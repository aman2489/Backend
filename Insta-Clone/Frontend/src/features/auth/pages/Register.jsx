import axios from "axios";
import { useState } from "react"
import { Link } from "react-router"

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/auth/register", {
            username,
            email,
            password
        },{
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            setUsername("")
            setEmail("")
            setPassword("")
        })
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
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        </div>
    </main>
  )
}

export default Register
