import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import Axios from "../../Axios";
import Cookies from "js-cookie";

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

  const handleAccept = (userId) => {
    setAcceptedUsers((prev) => new Set(prev).add(userId));
  };

  return (
    <div className="flex min-h-screen">
      <button
        className="fixed top-0 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

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
          <table className="min-w-full bg-white border border-gray-300">
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
                <tr key={user.id} className="hover:bg-gray-100">
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
                    {acceptedUsers.has(user.id) ? (
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Accepted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAccept(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Decline
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserRequest;
