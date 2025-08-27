/* eslint-disable react/prop-types */

const WorkshopCard = ({ image, name, handle, date, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row transition-transform transform hover:scale-105 duration-300 border border-gray-200 m-4">
      {/* Left - Image */}
      <div className="md:w-1/2 w-full h-72 md:h-auto">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right - Content */}
      <div className="p-8 md:w-1/2 w-full flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Meet Your Instructor – {name}{" "}
          <span style={{ color: "#F8DE55" }}>{handle}</span> ✨
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          {description} <strong>{date}</strong>
        </p>
        <button
          className="mt-4 self-start text-white px-5 py-2 rounded-full shadow-lg transition duration-300"
          style={{ backgroundColor: "#F8DE55", color: "#000" }}
        >
          Join the Workshop
        </button>
      </div>
    </div>
  );
};

export default WorkshopCard;
