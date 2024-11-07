import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Sling as Hamburger } from "hamburger-react";
import Axios from "../../Axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import BASE_URL from "../../Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TrialVideo() {
  const { courseId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trialVideos, setTrialVideos] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [newVideos, setNewVideos] = useState([]);

  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchTrialVideo = async () => {
      try {
        const response = await Axios.get(`Course/course-detail/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrialVideos(response.data.trial_videos);
        setCourseTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching trial video:", error);
        toast.error("Failed to fetch trial videos!");
      }
    };
    fetchTrialVideo();
  }, [token, courseId]);

  const handleAddVideo = async () => {
    if (newVideos.length === 0) {
      toast.warn("Please select videos to upload!");
      return;
    }

    const formData = new FormData();
    newVideos.forEach((video) => {
      formData.append("video", video);
    });

    try {
      const response = await Axios.post(
        `Course/add-trial-video/${courseId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newVideoUrls = newVideos.map((video) => ({
        video: URL.createObjectURL(video),
      }));

      setTrialVideos([...trialVideos, ...newVideoUrls]);
      setNewVideos([]);
      toast.success("Videos added successfully!");
    } catch (error) {
      console.log("Error adding videos:", error);
      toast.error("Error adding videos!");
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      await Axios.delete(`Course/remove-trial-video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrialVideos(trialVideos.filter((video) => video.id !== videoId));
      toast.success("Video removed successfully!");
    } catch (error) {
      console.error("Error removing video:", error);
      toast.error("Error removing video!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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

      <div className="flex flex-col items-center w-full py-8 px-4 ml-64">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          {courseTitle}
        </h1>

        <div className="w-full overflow-y-auto max-h-screen p-4 flex justify-center">
          {trialVideos && trialVideos.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trialVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-[10cm] h-[10cm] bg-white shadow-md rounded-lg overflow-hidden p-4"
                >
                  <video controls className="w-full h-[7cm] rounded-md mb-2">
                    <source
                      src={`${BASE_URL}${video.video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  <button
                    onClick={() => handleRemoveVideo(video.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md text-sm transition duration-300 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl text-gray-500">No Trial Video Available</p>
          )}

          <div className="mt-8 w-full max-w-lg">
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => setNewVideos(Array.from(e.target.files))}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md mb-4 py-2 px-3"
            />
            <button
              onClick={handleAddVideo}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-md text-lg transition duration-300 hover:bg-blue-600"
            >
              Add Videos
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default TrialVideo;
