import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Sling as Hamburger } from "hamburger-react";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserRequest() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState(new Set());

  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchUserRequest = async () => {
      if (!token) {
        console.log("Token not found");
        return;
      }
      try {
        const response = await Axios.get("Account/userData/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchUserRequest();
  }, [token]);

  const handleUserAction = async (userId, action) => {
    try {
      const response = await Axios.post(
        `Account/manageUserRequest/${userId}/${action}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (action === "accept") {
          setAcceptedUsers((prev) => new Set(prev).add(userId));
          toast.success("User accepted successfully!");
        }
        if (action === "decline") {
          setUserData((prevData) =>
            prevData.filter((user) => user.id !== userId)
          );
        } else {
          setUserData((prevData) =>
            prevData.map((user) => {
              return user.id === userId ? { ...user, accepted: true } : user;
            })
          );
        }
      }
    } catch (error) {
      console.log(`Error on ${action}`, error);
      toast.error(`Error on ${action} user`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="left-4 z-50 md:hidden">
        <Hamburger
          toggled={isSidebarOpen}
          toggle={setIsSidebarOpen}
          color="#000000"
        />
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <AdminSideBar />
      </div>

      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">User Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="p-4 border-b">Profile Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-100 ${
                    acceptedUsers.has(user.id) ? "bg-gray-400" : "bg-white"
                  }`}
                >
                  <td className="p-4 border-b text-center">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-4 border-b text-center">{user.name}</td>
                  <td className="p-4 border-b text-center">{user.email}</td>
                  <td className="p-4 border-b text-center">{user.phone}</td>
                  <td className="p-4 border-b text-center space-x-2">
                    <button
                      onClick={() => handleUserAction(user.id, "accept")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleUserAction(user.id, "decline")}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserRequest;
