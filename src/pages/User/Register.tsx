import { useState } from "react";
import type {
  RegisterCredentials,
  RegisterFormValues,
} from "../../types/authentication";
import api from "../../lib/axios";
import { useAuth } from "../../lib/auth-context";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/layout/Loader";
import { AxiosError } from "axios";

import fireBg from "../../assets/fire-background.png";
import logo from "../../assets/logo.png";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  } as RegisterFormValues);
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }
      const response = await api.post("/users/register", {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      } as RegisterCredentials);
      if (response?.status === 201) {
        toast.success("Registered successfully!");
        const { token } = response.data.data;
        setToken(token);
      }
    } catch (err) {
      toast.error(err instanceof AxiosError && err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${fireBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "1900px auto",
      }}
    >
      <div className="bg-[#F6F6EF]/70 backdrop-blur-md shadow-2xl w-[600px] h-screen p-8 text-center">
        {/* Logo + titlu + slogan */}
        <img src={logo} alt="Logo" className="w-[500px] h-auto mx-auto mb-8" />

        {/* Tabs: Log In / Sign Up */}
        <div className="flex justify-center mb-6 text-sm font-medium space-x-6">
          <Link
            to="/login"
            className="text-gray-500 hover:text-black transition"
          >
            Log In
          </Link>

          <button className="text-black border-b-2 border-[#90D1CA] pb-1">
            Sign Up
          </button>
        </div>

        {/* Formular */}
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-[#FFFAF4] shadow-md border-0 focus:outline-none placeholder-[#ccbca3] text-sm h-12"
          />

          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-[#FFFAF4] shadow-md border-0 focus:outline-none placeholder-[#ccbca3] text-sm h-12"
          />

          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-[#FFFAF4] shadow-md border-0 focus:outline-none placeholder-[#ccbca3] text-sm h-12"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="CONFIRM PASSWORD"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-[#FFFAF4] shadow-md border-0 focus:outline-none placeholder-[#ccbca3] text-sm h-12"
          />

          {/* Checkbox */}
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              required
              className="accent-[#90D1CA] border-none"
            />
            <span>I agree to the Terms of Service</span>
          </label>

          {/* Register Button */}
          <div className="flex w-full items-center justify-center gap-3">
            <button
              type="submit"
              className="w-full h-12 py-2 rounded-md bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold mt-2"
            >
              Register
            </button>
            <Loader show={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
