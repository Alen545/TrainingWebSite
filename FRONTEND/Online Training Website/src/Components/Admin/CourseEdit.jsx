import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Sling as Hamburger } from "hamburger-react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function CourseEdit() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    course_photo: null,
    trial_video: null,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await Axios.get(`Course/course-detail/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details");
      }
    };
    fetchCourse();
  }, [courseId, token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("duration", course.duration);
    formData.append("price", course.price);
    if (course.course_photo)
      formData.append("course_photo", course.course_photo);
    if (course.trial_video) formData.append("trial_video", course.trial_video);

    try {
      await Axios.put(`Course/course-detail/${courseId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Course updated successfully!");
      navigate("/viewCourse");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
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

      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Course Photo</label>
            <input
              type="file"
              name="course_photo"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Trial Video</label>
            <input
              type="file"
              name="trial_video"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Course
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CourseEdit;
