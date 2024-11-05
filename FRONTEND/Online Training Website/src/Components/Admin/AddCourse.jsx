import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Sling as Hamburger } from "hamburger-react";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    duration: "",
    price: "",
    trialVideo: [],
    coursePhoto: null,
  });

  const navigate = useNavigate();

  const token = Cookies.get("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "trialVideo") {
      setFormData({ ...formData, [name]: Array.from(files) });// Convert the FileList to an array and store it in state
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.courseName);
    data.append("description", formData.description);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("course_photo", formData.coursePhoto);
    formData.trialVideo.forEach((video)=>{
      data.append("video",video)
    })

    try {
      await Axios.post("Course/course-list/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Course added successfully!");

      setFormData({
        courseName: "",
        description: "",
        duration: "",
        price: "",
        trialVideo: [],
        coursePhoto: null,
      });

      setTimeout(() => {
        navigate("/viewCourse");
      }, 3000);
    } catch (error) {
      toast.error("Failed to add course.");
    }
  };

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

      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Course Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Course Description"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Duration"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Price"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Trial Videos</label>
              <input
                type="file"
                name="trialVideo"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded p-2"
                accept="video/*"
                multiple
              />
            </div>
            <div>
              <label className="block text-gray-700">Course Photo</label>
              <input
                type="file"
                name="coursePhoto"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded p-2"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Course
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
