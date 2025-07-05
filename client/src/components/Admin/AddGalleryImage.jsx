/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddGalleryImage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Create image preview
    const imageURL = URL.createObjectURL(selectedImage);
    setImagePreview(imageURL);
  };

  // Handle image upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !title || !description) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    setLoading(true);

    try {
      // Get the authentication token (from localStorage or another storage)
      const token = localStorage.getItem("token"); // Or wherever you're storing the token

      const response = await axios.post(`${API_URL}/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
          "Content-Type": "multipart/form-data", // Ensures that the request is processed as form data
        },
      });

      alert("Image uploaded successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      fetchGalleryImages(); // Fetch the updated gallery images after upload
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all gallery images
  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(`${API_URL}/gallery`);
      setGalleryImages(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching gallery images");
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (imageId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URL}/gallery/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Image deleted successfully!");
      fetchGalleryImages(); // Refresh the gallery images after deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting image");
    }
  };

  // Fetch images when component mounts
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Image to Gallery</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {imagePreview && (
            <div className="mt-4 text-center">
              <img
                src={imagePreview}
                alt="Image preview"
                className="max-w-full h-auto rounded-md shadow-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-sm disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-12 mb-6">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.length > 0 ? (
          galleryImages.map((image) => (
            <div key={image._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images in gallery</p>
        )}
      </div>
    </div>
  );
};

export default AddGalleryImage;
