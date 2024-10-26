import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-5 bg-gray-800 text-white ">
      <div onClick={() => navigate("/")} className="text-lg font-bold">
        Alen's Group
      </div>

      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md border border-gray-300"
        />
      </div>

      <div>
        <button
          onClick={() => navigate("/userLogin")}
          className="text-white hover:text-opacity-70"
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default NavBar;
