import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Download, X } from "lucide-react";

import makeupFlyer from "../../assets/images/makeup.png";
import phoneFlyer from "../../assets/images/phonerepair.png";

const OngoingWorkshops = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const flyers = [
    { src: makeupFlyer, alt: "Makeup Workshop Flyer", time: "12PM - 4PM" },
    { src: phoneFlyer, alt: "Phone Repair Workshop Flyer", time: "12PM - 6PM" },
  ];

  const handleDownload = (src, alt) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt.replace(/\s+/g, "_") + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl mt-2 text-center">
        Ongoing Workshops
      </h1>
      <p className="text-gray-600 text-lg sm:text-xl mt-2 text-center">
        🎟 Limited Seats Available – Enroll Now!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4 mt-6">
        {flyers.map((flyer, idx) => (
          <div
            key={idx}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
            onClick={() => setSelectedImage(flyer)}
          >
            <img
              src={flyer.src}
              alt={flyer.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      >
        {selectedImage && (
          <div className="relative bg-gradient-to-b from-white to-gray-100 rounded-2xl shadow-2xl max-w-3xl w-full p-6 flex flex-col items-center animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-black text-white p-3 rounded-full hover:bg-gray-700 transition shadow-lg"
            >
              <X size={22} />
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-md"
            />

            {/* Workshop Info */}
            <p className="mt-4 text-lg font-semibold text-gray-800">
              🕒 Timing:{" "}
              <span className="text-blue-600">{selectedImage.time}</span>
            </p>

            {/* Action Section */}
            <div className="mt-6 text-center">
              <p className="text-red-600 font-bold text-lg mb-4 animate-pulse">
                ⚡ Hurry! Limited seats available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    handleDownload(selectedImage.src, selectedImage.alt)
                  }
                  className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105 transform transition"
                >
                  <Download size={20} /> Download Flyer
                </button>
                <a
                  href="https://workshop-registration-phi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:from-gray-800 hover:to-black hover:scale-105 transform transition"
                >
                  🚀 Enroll Now
                </a>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default OngoingWorkshops;
