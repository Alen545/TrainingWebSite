import React, { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import BASE_URL from "../../Config";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await Axios.get("Course/course-list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourse();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/userCourseDetails/${courseId}/`);
  };

  const filteredCourses = searchQuery
    ? courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    : courses;

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="border p-4 rounded shadow-md"
              >
                <img
                  src={`${BASE_URL}${course.course_photo}`}
                  alt={course.photo}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-gray-600">Duration: {course.duration}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              {" "}
              No courses found for "{searchQuery}".
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default UserHomePage;
