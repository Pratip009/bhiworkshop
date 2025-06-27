import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../api/userApi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Unauthorized: Please log in again.");
        setLoading(false);
        localStorage.clear();
        window.location.href = "/login"; // Redirect user to login
        return;
      }

      const userData = await fetchUserProfile(userId);
      if (!userData) {
        setError("Failed to load profile.");
      } else {
        setUser(userData);
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Role:</strong> {user?.role}</p>
    </div>
  );
};

export default Profile;
