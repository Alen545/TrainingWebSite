import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Sling as Hamburger } from "hamburger-react";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ViewCourse() {
  const [courses, setCourses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  //Fetch all Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get("Course/course-list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token]);

  const handleDelete = async (courseId) => {
    try {
      await Axios.delete(`Course/course-detail/${courseId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course.id !== courseId));
      toast.success("Course Deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Error deleting course");
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
        <h1 className="text-2xl font-bold mb-4">Course List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Course Photo</th>
                <th className="px-4 py-2 border">Trial Video</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-2 border">{course.title}</td>
                  <td className="px-4 py-2 border">{course.description}</td>
                  <td className="px-4 py-2 border">{course.duration} Months</td>
                  <td className="px-4 py-2 border">₹{course.price}</td>
                  <td className="px-4 py-2 border">
                    {course.course_photo ? (
                      <img
                        src={course.course_photo}
                        alt="Course Photo"
                        className="h-16 w-16 object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {course.trial_videos ? (
                      <button
                        onClick={() => navigate(`/trialVideo/${course.id}/`)}
                        className="text-blue-500 underline"
                      >
                        View Video
                      </button>
                    ) : (
                      "No Video"
                    )}
                  </td>

                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/courseEdit/${course.id}/`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewCourse;
