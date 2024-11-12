import React, { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import BASE_URL from "../../Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {
  const [userProfile, setUserProfile] = useState("");
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
        console.log("Error for fetching user data", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  const handleDeleteClick = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (confirmDelete) {
        await Axios.delete("Account/profileOperations/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Your account has been deleted successfully.");
        navigate("/userLogin");
      }
    } catch (error) {
      console.log("Error deleting account", error);
      toast.error("There was an error deleting your account.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>
      <main className="p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <img
              src={`${BASE_URL}${userProfile.profile_img}`}
              alt="User Profile"
              className="w-32 h-32 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                Name: {`${userProfile.first_name} ${userProfile.last_name}`}
              </h2>
              <p className="text-gray-600">
                <span className="font-bold">Email: </span>
                {userProfile.email}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Username: </span>
                {userProfile.username}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Phone: </span>
                {userProfile.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Gender: </span>
                {userProfile.gender}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Qualification: </span>
                {userProfile.qualification}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Passout Year: </span>
                {userProfile.passout_year}
              </p>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => navigate("/userEditProfile")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit Account
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default UserProfile;
