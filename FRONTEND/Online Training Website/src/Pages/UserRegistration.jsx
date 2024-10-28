import React, { useState } from "react";
import GuestNavBar from "./GuestNavBar";
import GuestFooter from "./GuestFooter";
import Axios from "../Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    qualification: "",
    phoneNumber: "",
    passoutYear: "",
    gender: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (event) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      profileImage: event.target.files[0],
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      profileImage: "",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(details).forEach((key) => {
      if (details[key] === "" && key !== "profileImage") {
        newErrors[key] = "This field is empty";
      }
    });
    if (!details.profileImage) {
      newErrors.profileImage = "Profile image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(details).forEach((key) => {
      formData.append(key, details[key]);
    });

    try {
      const response = await Axios.post("Account/registerUser/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(
          "Registration successful. Admin approval takes 1hr. Check your email for login details."
        );
        setTimeout(() => {
          navigate("/userLogin");
        }, 3000);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavBar />
      <ToastContainer />
      <main className="flex-grow flex items-center justify-center p-6 bg-gray-100">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={details.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={details.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={details.qualification}
                onChange={handleChange}
                placeholder="Enter your qualification"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.qualification ? 'border-red-500' : ''}`}
                required
              />
              {errors.qualification && <p className="text-red-500 text-xs italic">{errors.qualification}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone-number">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone-number"
                name="phoneNumber"
                value={details.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber ? 'border-red-500' : ''}`}
                required
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passout-year">
                Passout Year
              </label>
              <input
                type="number"
                id="passout-year"
                name="passoutYear"
                value={details.passoutYear}
                onChange={handleChange}
                placeholder="Enter your passout year"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passoutYear ? 'border-red-500' : ''}`}
                required
              />
              {errors.passoutYear && <p className="text-red-500 text-xs italic">{errors.passoutYear}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={details.gender === "male"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={details.gender === "female"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={details.gender === "other"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Other
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile-image">
                Profile Image
              </label>
              <input
                type="file"
                id="profile-image"
                name="profileImage"
                onChange={handleImageChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.profileImage ? 'border-red-500' : ''}`}
                required
              />
              {errors.profileImage && <p className="text-red-500 text-xs italic">{errors.profileImage}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>
        </div>
      </main>
      <GuestFooter />
    </div>
  );
}

export default UserRegistration;
