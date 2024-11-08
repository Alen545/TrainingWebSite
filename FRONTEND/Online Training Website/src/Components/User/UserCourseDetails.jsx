import React, { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import Axios from "../../Axios";
import BASE_URL from "../../Config";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function UserCourseDetails() {
  const { courseId } = useParams();
  const token = Cookies.get("authToken");
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await Axios.get(`Course/course-detail/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourseDetails(response.data);
      } catch (error) {
        console.log("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>

      <main className="flex-grow p-6 flex justify-center items-center">
        <div className="max-w-2xl w-full border p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">{courseDetails.title}</h2>

          {courseDetails.trial_videos &&
          courseDetails.trial_videos.length > 0 ? (
            <Swiper spaceBetween={10} slidesPerView={1} loop>
              {courseDetails.trial_videos.map((videoObj) => (
                <SwiperSlide key={videoObj.id}>
                  <video
                    src={`${BASE_URL}${videoObj.video}`}
                    controls
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-600">No trial videos available.</p>
          )}

          <p className="text-gray-700 font-bold">₹{courseDetails.price}</p>
          <p className="text-gray-700 font-bold">
            Duration: {courseDetails.duration} Months
          </p>
          <p className="text-gray-700 mt-2 font-bold">
            {courseDetails.description}
          </p>
        </div>
      </main>

      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default UserCourseDetails;
