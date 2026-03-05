import { Link } from "react-router";
import "../styles/form.scss";
import { useState } from "react";
import FormGroup from "../components/FormGroup";

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
          <FormGroup
          label="Username"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormGroup
          label="Email" 
          name="email" 
          placeholder="Enter Email" 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          />
          <FormGroup
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
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
