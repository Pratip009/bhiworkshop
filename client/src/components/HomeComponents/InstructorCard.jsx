import image from "../../assets/images/beauty.jpeg";

const InstructorCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row transition-transform transform hover:scale-105 duration-300 border border-gray-200">
        {/* Left - Image */}
        <div className="md:w-1/2 w-full h-72 md:h-auto">
          <img
            src={image}
            alt="Instructor Josh"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Content */}
        <div className="p-8 md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Meet Your Instructor – Josh{" "}
            <span style={{ color: "#F8DE55" }}>@hairbyjoshnyc</span> ✨
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            We’re thrilled to welcome Josh, a renowned beauty expert from NYC,
            as your makeup instructor for our upcoming workshop on{" "}
            <strong>24th August</strong>.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            Josh brings a wealth of experience, creativity, and passion for
            empowering you through beauty. With his expertise in both subtle
            everyday looks and glamorous transformations, Josh will guide you
            step-by-step to confidently highlight your natural beauty and master
            the art of makeup.
          </p>
          <button
            className="mt-4 self-start text-white px-5 py-2 rounded-full shadow-lg transition duration-300"
            style={{ backgroundColor: "#F8DE55", color: "#000" }}
          >
            Join the Workshop
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
