import { useState } from "react";
import type { LoginCredentials } from "../../types/authentication";
import api from "../../lib/axios";
import { useAuth } from "../../lib/auth-context";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/layout/Loader";

import fireBg from "../../assets/fire-background.png";
import logo from "../../assets/logo.png";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  } as LoginCredentials);
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData: LoginCredentials) => {
      if (e.target.name === "rememberMe") {
        return { ...prevFormData, [e.target.name]: e.target.checked };
      }
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/users/login", formData);
      if (response?.status === 200) {
        const { data } = response;
        setToken(data.data?.token);
        toast.success("Logged in successfully!");
      }
    } catch (err) {
      toast.error("Error logging in: " + (err instanceof Error && err.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      className="w-screen flex justify-center px-4"
      style={{
        backgroundImage: `url(${fireBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "1900px auto",
      }}
    >
      <div className="bg-[#F6F6EF]/70 backdrop-blur-md shadow-2xl w-[600px] h-screen p-8 text-center">
        <img src={logo} alt="Logo" className="w-[500px] h-auto mx-auto mb-8" />
        <div className="flex justify-center mb-6 text-sm font-medium space-x-6">
          <button className="text-black border-b-2 border-[#90D1CA] pb-1">
            Log In
          </button>
          <Link
            to="/register"
            className="text-gray-500 hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Formular login */}
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <input
            type="text"
            id="email"
            name="email"
            required
            placeholder="EMAIL / USERNAME"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#FFFAF4] shadow-md border-0 focus:outline-none placeholder-[#ccbca3] text-sm h-12"
          />

          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#FFFAF4] shadow-md border-0 focus:outline-none placeholder-[#ccbca3] text-sm h-12"
          />

          {/* Checkbox Remember Me */}
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="accent-[#90D1CA] border-none"
            />
            <span>Remember Me?</span>
          </label>

          {/* Login Button */}
          <div className="flex w-full items-center justify-center gap-3">
            <button
              type="submit"
              className="w-full h-12 py-2 rounded-md bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold mt-2"
            >
              Login
            </button>
            <Loader show={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
