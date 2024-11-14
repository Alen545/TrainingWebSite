import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";
import Cookies from "js-cookie";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get("/get-user-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setFormData({
          ...formData,
          name: `${response.data.first_name} ${response.data.last_name}`,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("/contact-us", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>

      <main className="flex-grow p-6 bg-gray-100">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-500 text-2xl" />
            <p className="text-lg">+91 6282885176</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-green-500 text-2xl" />
            <p className="text-lg">alengeorge1999@gmail.com</p>
          </div>
        </div>

        <form
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </main>

      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default ContactUs;
