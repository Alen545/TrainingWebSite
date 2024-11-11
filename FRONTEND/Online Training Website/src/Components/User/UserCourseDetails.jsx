import React, { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";
import Axios from "../../Axios";
import BASE_URL from "../../Config";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function UserCourseDetails() {
  const { courseId } = useParams();
  const token = Cookies.get("authToken");
  const [courseDetails, setCourseDetails] = useState(null);
  const [interested, setInterested] = useState(false);
  const [applied, setApplied] = useState(false);

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

  const handleInterest = async () => {
    try {
      await Axios.post(
        "Course/interest/",
        { course: courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterested(true);
    } catch (error) {
      console.log("Error recording interest:", error);
    }
  };

  const handleApply = async () => {
    try {
      await Axios.post(
        "Course/apply/",
        { course: courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplied(true);
      alert("HR will connect with you shortly!");
    } catch (error) {
      console.log("Error applying:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <UserNavBar />
      </header>

      <main className="flex-grow p-6 flex justify-center items-center">
        <div className="max-w-2xl w-full border p-4 rounded shadow-md">
          {courseDetails ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{courseDetails.title}</h2>

              {courseDetails.trial_videos &&
              courseDetails.trial_videos.length > 0 ? (
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop
                  autoPlay
                >
                  {courseDetails.trial_videos.map((videoObj) => (
                    <div key={videoObj.id} className="w-full h-64">
                      <video
                        src={`${BASE_URL}${videoObj.video}`}
                        controls
                        className="w-full h-full object-cover mb-4 rounded"
                      />
                    </div>
                  ))}
                </Carousel>
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

              {/* Interest Button */}
              <button
                onClick={handleInterest}
                className={`mt-4 px-4 py-2 rounded ${
                  interested ? "bg-green-500" : "bg-blue-500"
                } text-white`}
              >
                {interested ? "Interested" : "Interest"}
              </button>

              {/* Apply Button */}
              {interested && !applied && (
                <button
                  onClick={handleApply}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Apply
                </button>
              )}
            </>
          ) : (
            <p>Loading course details...</p>
          )}
        </div>
      </main>

      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
}

export default UserCourseDetails;
