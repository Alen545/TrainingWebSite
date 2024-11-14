import React, { useState } from "react";
import Axios from "../../Axios";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function UserResetPassword() {
  const [formState, setFormState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    oldPasswordValid: null,
    passwordCriteriaMet: false,
    passwordsMatch: null,
  });

  const token = Cookies.get("authToken");

  const validatePassword = (password) => {
    const criteria =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    setFormState((prevState) => ({
      ...prevState,
      passwordCriteriaMet: criteria.test(password),
    }));
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      newPassword: password,
    }));
    validatePassword(password);
    setFormState((prevState) => ({
      ...prevState,
      passwordsMatch: password === formState.confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      confirmPassword: confirmPwd,
    }));
    setFormState((prevState) => ({
      ...prevState,
      passwordsMatch: formState.newPassword === confirmPwd,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formState.oldPasswordValid &&
      formState.passwordCriteriaMet &&
      formState.passwordsMatch
    ) {
      try {
        await Axios.put(
          "Account/reset-password/",
          {
            oldPassword: formState.oldPassword,
            newPassword: formState.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Password reset successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error("Failed to reset password!");
      }
    } else {
      toast.error("Please ensure all criteria are met!");
    }
  };

  const checkOldPassword = async () => {
    try {
      const response = await Axios.post(
        "Account/reset-password/",
        { oldPassword: formState.oldPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "Password is verified"
      ) {
        setFormState((prevState) => ({
          ...prevState,
          oldPasswordValid: true,
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          oldPasswordValid: false,
        }));
      }
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        oldPasswordValid: false,
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <UserNavBar />
      <div className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={formState.oldPassword}
              onChange={(e) =>
                setFormState({ ...formState, oldPassword: e.target.value })
              }
              onBlur={checkOldPassword}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {formState.oldPasswordValid !== null && (
              <span className="inline-block mt-2">
                {formState.oldPasswordValid ? (
                  <TiTick className="text-green-500" />
                ) : (
                  <ImCross className="text-red-500" />
                )}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={formState.newPassword}
              onChange={handleNewPasswordChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-sm text-gray-500 mt-2">
              Password must be at least 8 characters long, contain at least one
              number, and one special character.
            </p>
            {formState.passwordCriteriaMet ? (
              <TiTick className="text-green-500" />
            ) : (
              <ImCross className="text-red-500" />
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {formState.passwordsMatch !== null && (
              <span className="inline-block mt-2">
                {formState.passwordsMatch ? (
                  <TiTick className="text-green-500" />
                ) : (
                  <ImCross className="text-red-500" />
                )}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
      <UserFooter />
      <ToastContainer />
    </div>
  );
}

export default UserResetPassword;
