import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      alert("Registration successful!");
      console.log("Registration successful:", response.data);
      window.location.href = "/login";
    } catch (error) {
      alert(
        "Registration failed: " +
          (error.response ? error.response.data.message : error.message)
      );
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">

      <div className="mb-2 text-center">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-8 w-8 text-primary mr-2 text-[#FFD93D]" />
          <h1 className="text-3xl font-bold text-foreground">Ursafe</h1>
        </div>
        <p className="text-muted-foreground">Your Personal Vault of Memories.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} w-full max-w-md>
          <h2 className="text-center font-medium text-xl">Create Account</h2>
          <h6 className="text-center mt-1 text-sm text-[#44444E]">
            Sign up for a new account
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
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  className="bg-[#F3F2EC] pl-5 w-full h-10 rounded-lg"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
            <div className="flex items-center space-x-2 mt-10">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-border cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <button className="text-primary hover:underline font-medium cursor-pointer">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-primary hover:underline font-medium cursor-pointer">
                  Privacy Policy
                </button>
              </label>
            </div>
            <button className="bg-[#0F0E0E] text-white w-full h-10 rounded-lg cursor-pointer">
              Create Account
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
