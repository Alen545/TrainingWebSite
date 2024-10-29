import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuestNavBar from "./GuestNavBar";
import GuestFooter from "./GuestFooter";
import Axios from "../Axios";
import Cookies from "js-cookie";

function UserLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      toast.error("Username and password fields cannot be empty.");
      return;
    }

    try {
      const response = await Axios.post("Account/loginUser/", credentials);
      if (response.status === 200) {
        const { access: token } = response.data;
        Cookies.set("authToken", token);
        toast.success("Login successful!");

        if (credentials.username === "admin") {
          navigate("/adminHomePage");
        } else {
          navigate("/userHomePage");
        }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavBar />
      <main className="flex-grow flex items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-gray-700 transition duration-200"
              >
                Login
              </button>
            </div>

            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a
                href="/userRegistration"
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </main>
      <GuestFooter />
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
