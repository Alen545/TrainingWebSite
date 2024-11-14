import React from "react";
import { Link } from "react-router-dom";

function UserFooter() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
        {/* Navigation Links */}
        <ul className="flex flex-col lg:flex-row justify-center lg:justify-start space-y-3 lg:space-y-0 lg:space-x-6 text-center lg:text-left">
          <li>
            <Link to="/aboutUs" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contactUs" className="hover:underline">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/testimonial" className="hover:underline">
              Testimonial
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-and-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
          </li>
        </ul>

        {/* Copyright Section */}
        <p className="text-sm md:text-base text-center lg:text-center lg:order-none">
          &copy; {new Date().getFullYear()} Alen's Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default UserFooter;
