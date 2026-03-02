import { Link } from "react-router";
import "../styles/form.scss";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {username, email, password}
    console.log(data);
    setUsername("")
    setEmail("")
    setPassword("")
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            required
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input type="text" 
          name="email" 
          placeholder="Enter Email" 
          required 
          value={email}
          onInput={(e) => {setEmail(e.target.value)}}
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
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login to account.</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
