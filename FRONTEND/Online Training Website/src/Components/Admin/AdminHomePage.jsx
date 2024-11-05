import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Sling as Hamburger } from "hamburger-react";

function AdminHomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

      <div className="flex-grow p-8 ml-0 md:ml-30">
        <h1 className="text-4xl font-bold mb-4">Welcome to Alen's Group</h1>
        <p className="text-lg text-gray-700">
          Welcome to the admin dashboard! Here you can manage users, courses,
          and see status updates.
        </p>
      </div>
    </div>
  );
}

export default AdminHomePage;
