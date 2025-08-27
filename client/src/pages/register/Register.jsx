import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErr(null); // Clear previous errors

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      console.log("User registered:", res.data);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      // Show proper error message
      if (error.response?.data?.sqlMessage) {
        setErr(error.response.data.sqlMessage);
      } else if (error.response?.data?.message) {
        setErr(error.response.data.message);
      } else {
        setErr("Something went wrong!");
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social-Web.</h1>
          <p>
           Register now and  connect with friends, share your moments, and explore trending stories. Join the community to discover, interact, and stay updated always.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && <span className="error">{err}</span>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
