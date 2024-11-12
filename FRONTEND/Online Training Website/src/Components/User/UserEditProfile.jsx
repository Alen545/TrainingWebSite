import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserEditProfile() {
  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
    gender: "",
    qualification: "",
    passout_year: "",
    profile_img: "",
  });
  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await Axios.get("Account/userData/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setUserProfile({ ...userProfile, profile_img: files[0] });
    } else {
      setUserProfile({ ...userProfile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("first_name", userProfile.first_name);
      formData.append("last_name", userProfile.last_name);
      formData.append("email", userProfile.email);
      formData.append("username", userProfile.username);
      formData.append("phone", userProfile.phone);
      formData.append("gender", userProfile.gender);
      formData.append("qualification", userProfile.qualification);
      formData.append("passout_year", userProfile.passout_year);

      if (userProfile.profile_img) {
        formData.append("profile_img", userProfile.profile_img);
      }

      await Axios.put("Account/profileOperations/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully!");
      navigate("/userProfile");
    } catch (error) {
      console.log("Error updating profile", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>
      <main className="p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={userProfile.first_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={userProfile.last_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userProfile.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={userProfile.qualification}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="col-span-1">
                <label className="block font-medium text-gray-600">
                  Passout Year
                </label>
                <input
                  type="text"
                  name="passout_year"
                  value={userProfile.passout_year}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-medium text-gray-600">Gender</label>
              <select
                name="gender"
                value={userProfile.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block font-medium text-gray-600">
                Profile Image
              </label>
              <input
                type="file"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="mt-auto">
        <UserFooter />
      </footer>
      <ToastContainer />
    </div>
  );
}

export default UserEditProfile;
