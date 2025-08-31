import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");
      console.log("Login successful:", response.data);
      window.location.href = "/dash";
    } catch (error) {
      alert(
        "Login failed: " +
        (error.response ? error.response.data.message : error.message)
      );
      console.error("Login error:", error);
    }
  };

  const handleSoon = () => {
    alert("Feature coming soon!");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">

      <div className="mb-2 text-center">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-8 w-8 text-primary mr-2 text-[#FFD93D]" />
          <h1 className="text-3xl font-bold text-foreground">Ursafe</h1>
        </div>
        <p className="text-muted-foreground">Your Personal Vault of Memories.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} w-full max-w-md>
          <h2 className="text-center font-medium text-xl">Welcome Back!</h2>
          <h6 className="text-center mt-1 text-sm text-[#44444E]">
            Sign in to your account
          </h6>

          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <div className="relative">
                <input
                  className="bg-[#F3F2EC] pl-5 w-full h-10 rounded-lg"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mt-5">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  className="bg-[#F3F2EC] pl-5 w-full h-10 rounded-lg"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button onClick={handleSoon} className="text-sm text-primary hover:underline cursor-pointer">
                Forgot password?
              </button>
            </div>
            <button className="bg-[#0F0E0E] text-white w-full h-10 rounded-lg cursor-pointer">
              Sign In
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
