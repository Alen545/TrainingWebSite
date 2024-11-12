import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { useNavigate } from "react-router-dom";

function UserNavBar({ searchQuery, setSearchQuery }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <header className="flex items-center justify-between p-5 bg-gray-800 text-white">
        <div
          onClick={() => navigate("/userHomePage")}
          className="text-lg font-bold cursor-pointer"
        >
          Alen's Group
        </div>

        <div className="hidden md:flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 text-black"
          />
        </div>

        <nav className="hidden md:flex space-x-4">
          <button
            className="w-full text-left hover:bg-blue-600 p-2 rounded"
            onClick={() => navigate("/userResetPassword")}
          >
            Reset Password
          </button>
          <button
            className="w-full text-left hover:bg-green-600 p-2 rounded"
            onClick={() => navigate("/userProfile")}
          >
            Profile
          </button>
          <button
            className="w-full text-left hover:bg-red-600 p-2 rounded"
            onClick={() => navigate("/userLogin")}
          >
            Logout
          </button>
        </nav>

        <div className="md:hidden">
          <Hamburger
            toggled={isNavOpen}
            toggle={setIsNavOpen}
            color="#ffffff"
          />
        </div>
      </header>

      {isNavOpen && (
        <nav className="md:hidden bg-gray-700 text-white p-4 space-y-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 text-black mb-2"
          />
          <button
            className="w-full text-left hover:bg-blue-600 p-2 rounded"
            onClick={() => navigate("/userResetPassword")}
          >
            Reset Password
          </button>
          <button
            className="w-full text-left hover:bg-green-600 p-2 rounded"
            onClick={() => navigate("/userProfile")}
          >
            Profile
          </button>
          <button
            className="w-full text-left hover:bg-red-600 p-2 rounded"
            onClick={() => navigate("/userLogin")}
          >
            Logout
          </button>
        </nav>
      )}
    </div>
  );
}

export default UserNavBar;
