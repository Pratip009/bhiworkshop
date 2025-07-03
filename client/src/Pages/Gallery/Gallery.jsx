import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import SpinnerLoader from "../../components/Loader";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const API_URL =
    import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com";
  // Function to fetch gallery items
  const fetchGallery = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`); // Fetch data from API
      if (!response.ok) {
        throw new Error("Failed to fetch gallery data");
      }
      const data = await response.json(); // Convert response to JSON
      setGalleryItems(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10">
      <Banner
        text="Our Gallery"
        imageUrl="https://img.freepik.com/free-photo/portrait-group-happy-students-casual-outfit-with-books-while-standing_8353-6397.jpg"
      />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {galleryItems.length > 0 ? (
          galleryItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Image */}
              <img
                className="w-full h-64 object-cover rounded-xl"
                src={item.imageUrl}
                alt={item.title}
              />

              {/* Title Below Image */}
            </div>
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <SpinnerLoader size={35} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
