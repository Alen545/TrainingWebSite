import React from 'react';
import GuestNavBar from './GuestNavBar';
import GuestFooter from './GuestFooter';

function UserLogin() {
  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavBar />

      <main className="flex-grow flex items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-gray-700 transition duration-200"
              >
                Login
              </button>
            </div>

            <p className="text-center text-gray-600 mt-4">
              Don’t you have an account?{' '}
              <a href="/userRegistration" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </main>

      <GuestFooter />
    </div>
  );
}

export default UserLogin;
