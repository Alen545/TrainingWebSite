import React from "react";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
function UserResetPassword() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>
      <main></main>
      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default UserResetPassword;
