import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { useNavigate } from "react-router-dom";

function UserNavBar() {
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
            className="w-full p-2 rounded-md border border-gray-300 text-black"
          />
        </div>

        <nav className="hidden md:flex space-x-4">
          <button href="#home" className="hover:underline">
            Profile
          </button>
          <button
            onClick={() => navigate("/userLogin")}
            className="w-full text-left hover:bg-red-600 p-2 rounded"
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
            className="w-full p-2 rounded-md border border-gray-300 text-black mb-2"
          />
          <a href="#home" className="block hover:underline">
            Profile
          </a>
          <a href="/userLogin" className="block hover:underline">
            LogOut
          </a>
        </nav>
      )}
    </div>
  );
}

export default UserNavBar;
