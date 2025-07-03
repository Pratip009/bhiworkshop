// src/api/userApi.js
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com"; // Your API base URL

// ✅ Fetch users from API
export const fetchUsers = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error(
      "❌ No token found in localStorage! User may need to log in."
    );
    return [];
  }

  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Users response:", response.data);
    return response.data; // Assuming response.data is an array of users
  } catch (error) {
    console.error(
      "❌ Error fetching users:",
      error.response?.data || error.message
    );
    return [];
  }
};

// ✅ Delete user
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found! User may need to log in.");
    return false;
  }

  try {
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(`✅ User with ID ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error(
      "❌ Error deleting user:",
      error.response?.data || error.message
    );
    return false;
  }
};

export const fetchUserProfile = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ User profile:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ fetchUserProfile error: ",
      error.response?.data || error.message
    );
    return null;
  }
};
