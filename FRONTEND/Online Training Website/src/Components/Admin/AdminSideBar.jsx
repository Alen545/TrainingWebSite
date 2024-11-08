import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSideBar() {
  const [isCourseDropdownOpen, setCourseDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleCourseDropdown = () => {
    setCourseDropdownOpen(!isCourseDropdownOpen);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 z-3 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3
          onClick={() => navigate("/adminHomePage")}
          className="text-2xl font-bold"
        >
          Admin Dashboard
        </h3>
      </div>

      <nav className="flex-grow p-4 space-y-4">
        <div>
          <button
            onClick={toggleCourseDropdown}
            className="flex items-center justify-between w-full text-left hover:bg-gray-700 p-2 rounded"
          >
            <span>Course</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
                isCourseDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isCourseDropdownOpen && (
            <div className="mt-2 space-y-2 pl-4">
              <Link
                to="/addCourse"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Add Course
              </Link>
              <Link
                to="/viewCourse"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                View Course
              </Link>
            </div>
          )}
        </div>

        <Link to="/userRequest" className="block hover:bg-gray-700 p-2 rounded">
          User Request
        </Link>

        <Link to="/userDetails" className="block hover:bg-gray-700 p-2 rounded">
          User Details
        </Link>

        <Link to="/status" className="block hover:bg-gray-700 p-2 rounded">
          Status
        </Link>

        <button
          onClick={() => navigate("/userLogin")}
          className="w-full text-left hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default AdminSideBar;
