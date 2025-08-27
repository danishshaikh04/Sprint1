import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!inputs.username || !inputs.password) {
      setErr("Username and password are required.");
      return;
    }

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response?.data || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome Back</h1>
          <p>
            Welcome to your social hub! Share thoughts, follow friends, connect instantly, and enjoy seamless experiences built to keep you closer together.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required // Ensures the field is filled
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required // Ensures the field is filled
            />
            {err && <div className="error">{err}</div>} {/* Display error message */}
            <button type="submit">Login</button> {/* Changed to type="submit" */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
