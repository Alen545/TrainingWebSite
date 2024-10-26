import React from "react";
import GuestNavBar from "./GuestNavBar";
import GuestFooter from "./GuestFooter";

function GuestHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <GuestNavBar />

      <main className="flex-grow p-8">
        <h2 className="text-2xl font-bold">Welcome to Alen's Group</h2>
        <p>
          This is the guest home page where you can find various features and
          resources.
        </p>
      </main>

      <GuestFooter />
    </div>
  );
}

export default GuestHome;
