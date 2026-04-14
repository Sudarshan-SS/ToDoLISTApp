// login.tsx
import { useState } from "react";
import "./login.css";
import AuthService from "../../Services/LoginService";
import { type LoginRequest, type LoginResponse } from "../../Models/loginmodel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter username and password");
      return;
    }

    const loginRequest: LoginRequest = {
      username: username.trim(),
      password: password,
    };

    setIsLoading(true);
    try {
      const result: LoginResponse = await AuthService.login(loginRequest);
      if (result.loginstatus) {
        setUser({ username: username.trim() });
        localStorage.setItem("Token", result.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid username or password");
        setUsername("");
        setPassword("");
        
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page">
      <Toaster position="top-right" />

      <div className="login-card">
        {/* Icon */}
        <div className="login-icon-wrap">
          <span className="login-icon">✅</span>
        </div>

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your Todo account</p>

        {/* Username */}
        <div className="login-field">
          <label className="login-label">Username</label>
          <div className="login-input-wrap">
            <span className="login-input-icon">👤</span>
            <input
              type="text"
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
        </div>

        {/* Password */}
        <div className="login-field">
          <label className="login-label">Password</label>
          <div className="login-input-wrap">
            <span className="login-input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              className="login-input login-input-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-eye-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {/* {showPassword ? "🙈" : "👁️"} */}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="button"
          className={`login-btn ${isLoading ? "login-btn-disabled" : ""}`}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="login-spinner-row">
              <span className="login-spinner" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;