import React, { useState } from "react";
import Axios from '../../Axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import Cookies from "js-cookie";

function UserResetPassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    isOldPasswordValid: null,
    isNewPasswordValid: null,
    doPasswordsMatch: null,
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const token = Cookies.get("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "newPassword") {
      setValidation({
        ...validation,
        isNewPasswordValid: passwordRegex.test(value),
        doPasswordsMatch: value === formData.confirmPassword,
      });
    }

    if (name === "confirmPassword") {
      setValidation({
        ...validation,
        doPasswordsMatch: value === formData.newPassword,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation.isNewPasswordValid) {
      toast.error(
        "New password must be at least 8 characters long, contain letters, numbers, and symbols."
      );
      return;
    }

    if (!validation.doPasswordsMatch) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await Axios.post(
        "Account/reset-password/",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setValidation({ isOldPasswordValid: null, isNewPasswordValid: null, doPasswordsMatch: null });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred during reset."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Reset Password
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-6 sm:px-8 pt-6 pb-8 max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <div className="flex items-center">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {validation.isNewPasswordValid === true ? (
                <TiTick className="text-green-500 ml-2" size={20} />
              ) : validation.isNewPasswordValid === false ? (
                <ImCross className="text-red-500 ml-2" size={20} />
              ) : null}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Password must be at least 8 characters, include letters, numbers,
              and symbols.
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm New Password
            </label>
            <div className="flex items-center">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {validation.doPasswordsMatch === true ? (
                <TiTick className="text-green-500 ml-2" size={20} />
              ) : validation.doPasswordsMatch === false ? (
                <ImCross className="text-red-500 ml-2" size={20} />
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Reset Password
            </button>
          </div>
        </form>
      </main>
      <footer className="mt-auto">
        <UserFooter />
      </footer>
      <ToastContainer />
    </div>
  );
}

export default UserResetPassword;
