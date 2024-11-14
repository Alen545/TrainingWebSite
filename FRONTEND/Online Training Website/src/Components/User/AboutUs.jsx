import React from "react";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>

      <main className="flex-grow">
        <div className="p-6 bg-gray-100 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
          <p className="text-lg text-gray-700 text-center max-w-4xl">
            Welcome to Alen's Group! We aim to provide the best services for our
            customers with complete dedication and transparency. Our journey
            began with a passion for excellence and a commitment to innovation.
          </p>

          <div className="mt-8 flex flex-col items-center space-y-6">
            <div className="bg-yellow-100 text-yellow-800 px-6 py-4 rounded-lg shadow-md max-w-md text-center">
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-700">
                To empower customers with exceptional services and innovative
                solutions that simplify their lives.
              </p>
            </div>

            <div className="bg-blue-100 text-blue-800 px-6 py-4 rounded-lg shadow-md max-w-md text-center">
              <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
              <p className="text-gray-700">
                To be a global leader in service excellence, delivering value
                and trust through innovation and integrity.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default AboutUs;
