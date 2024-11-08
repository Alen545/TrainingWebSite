import React from "react";

function UserFooter() {
  return (
    <div>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>
          &copy; {new Date().getFullYear()} Alen's Group. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default UserFooter;
