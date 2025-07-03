import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../api/userApi";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("Unauthorized: Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchUserProfile(userId, token);
        console.log("Fetched User Data ➡️", userData);
        if (userData && userData.email && userData.username) {
          setUser(userData);
        } else {
          setError("Failed to load profile.");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const renderProfileTab = () => (
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto text-black">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold uppercase text-white">
          {user?.username?.[0] || "U"}
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-400">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="font-medium text-black">Username</span>
          <span>{user?.username}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="font-medium text-black">Email</span>
          <span>{user?.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-black">User ID</span>
          <span className="truncate max-w-[200px] text-right">{user?.id}</span>
        </div>
      </div>
    </div>
  );

  const renderWorkshopsTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Workshops</h2>
      {user?.purchasedCourses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.purchasedCourses.map((entry) => {
            const course = entry.course;
            if (!course || typeof course !== "object") return null;

            return (
              <div
                key={entry._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={course.imgUrl}
                    alt={course.title}
                    className="w-full h-44 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Enrolled
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {course.title || "Untitled Course"}
                  </h3>
                  {course.description ? (
                    <p
                      className="text-gray-600 text-sm mb-3 leading-relaxed"
                      title={course.description}
                    >
                      {course.description.length > 100
                        ? course.description.slice(0, 100) + "..."
                        : course.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm italic mb-3">
                      No description available.
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-semibold text-lg">
                      ${course.price || "0"}
                    </span>
                    <Link
                      to={`/courses/${course._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm font-medium rounded-full transition duration-200"
                    >
                      View Details
                    </Link>
                  </div>

                  <p className="text-gray-500 text-xs mt-2">
                    Enrolled on:{" "}
                    {entry.purchasedAt
                      ? new Date(entry.purchasedAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-400">
          <p className="text-lg">
            You haven&apos;t enrolled in any workshops yet.
          </p>
          <p className="text-sm mt-2">
            Browse courses and start learning today!
          </p>
        </div>
      )}
    </div>
  );

  if (loading) return <p className="p-6 text-blue-500">Loading profile...</p>;
  if (error) return <p className="p-6 text-red-500 font-semibold">⚠ {error}</p>;

  return (
    <div className="min-h-screen bg-white text-black flex">
      {/* Sidebar Tabs */}
      <div className="w-64 bg-gray-200 p-6 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left py-2 px-4 rounded-lg ${
                activeTab === "profile"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-300 text-gray-800"
              }`}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("workshops")}
              className={`w-full text-left py-2 px-4 rounded-lg ${
                activeTab === "workshops"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-300 text-gray-800"
              }`}
            >
              My Workshops
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === "profile" ? renderProfileTab() : renderWorkshopsTab()}
      </div>
    </div>
  );
};

export default Profile;
