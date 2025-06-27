import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

const FloatingButtons = () => {
  const phoneNumber = "2013771594"; // Ensure correct format
  const emailAddress = "Admin@bhilearning.com";
  const facebookURL = "https://www.facebook.com/yourpage"; // Replace with actual Facebook URL
  const instagramURL = "https://www.instagram.com/yourprofile"; // Replace with actual Instagram URL

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const openEmail = () => {
    window.open(`mailto:${emailAddress}`, "_blank");
  };

  const openFacebook = () => {
    window.open(facebookURL, "_blank");
  };

  const openInstagram = () => {
    window.open(instagramURL, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50 sm:bottom-6 sm:right-6 sm:space-y-3">
      {/* Email Button */}
      <button
        onClick={openEmail}
        className="bg-blue-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center"
      >
        <FaEnvelope className="text-xl sm:text-2xl" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
      >
        <FaWhatsapp className="text-2xl sm:text-3xl" />
      </button>

      {/* Facebook Button */}
      <button
        onClick={openFacebook}
        className="bg-blue-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center"
      >
        <FaFacebook className="text-2xl sm:text-3xl" />
      </button>

      {/* Instagram Button */}
      <button
        onClick={openInstagram}
        className="bg-pink-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:bg-pink-600 transition-all flex items-center justify-center"
      >
        <FaInstagram className="text-2xl sm:text-3xl" />
      </button>
    </div>
  );
};

export default FloatingButtons;
