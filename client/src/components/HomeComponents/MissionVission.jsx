import {
  FaUsers,
  FaStar,
  FaUserGraduate,
  FaHandshake,
  FaGlobe,
  FaPeopleArrows,
} from "react-icons/fa";

const coreValues = [
  {
    title: "RESPECT",
    icon: <FaUsers className="text-pink-500 text-3xl" />,
    description:
      "We believe that every individual has inherent worth and dignity. Through mutual respect, we all achieve greater success.",
  },
  {
    title: "EXCELLENCE",
    icon: <FaStar className="text-yellow-500 text-3xl" />,
    description:
      "We strive for excellence in healthcare education, student success, and career readiness.",
  },
  {
    title: "STUDENT SUCCESS",
    icon: <FaUserGraduate className="text-green-500 text-3xl" />,
    description:
      "We believe every student can be successful with the proper tools, training, and support.",
  },
  {
    title: "COMMITMENT",
    icon: <FaHandshake className="text-blue-500 text-3xl" />,
    description:
      "We are committed to surpassing the expectations of our students, graduates, and stakeholders.",
  },
  {
    title: "DIVERSITY",
    icon: <FaGlobe className="text-purple-500 text-3xl" />,
    description:
      "We embrace diversity to enrich the classroom experience and prepare students for a global workforce.",
  },
  {
    title: "TEAMWORK",
    icon: <FaPeopleArrows className="text-indigo-500 text-3xl" />,
    description:
      "We instill the importance of collaboration, communication, and creativity through effective teamwork.",
  },
];

const MissionVision = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
            Our Mission & Values
          </h1>
          <p className="mt-8 text-base text-black sm:text-xl">
            Empowering futures through excellence in education, integrity, and
            opportunity.
          </p>
        </div>

        {/* Mission */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-14 shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-10 rounded-3xl pointer-events-none" />
          <h3 className="text-2xl font-bold text-blue-700 mb-4">
            Mission Statement
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Bright Horizon Institute offers the highest quality, career-focused
            education to students seeking to improve their lives and those of
            others by entering healthcare and career-oriented fields. Our goal
            is to ensure every graduate enters the workforce with the knowledge,
            training, and experience needed to build a successful future.
          </p>
        </div>

        {/* Objectives */}

        {/* Objectives */}
        <div className="bg-white rounded-3xl md:p-14">
          <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl text-center">
            Objectives
          </h1>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              "Employ highly qualified, expert faculty members.",
              "Encourage innovation and professional development.",
              "Offer comprehensive, hands-on career training programs.",
              "Provide modern, effective learning environments and tools.",
              "Ensure real-world, practical experiences through internships.",
              "Align programs with current job market needs.",
              "Continually adapt to long-term industry trends.",
              "Provide career guidance and job placement support.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-white/20 border border-white/30 backdrop-blur-md rounded-xl shadow-md transition duration-300"
              >
                <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100/50 backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-black text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}

        <div className="bg-white rounded-3xl p-2 md:p-14">
          <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl text-center">
            Our Core Values
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
              >
                <div className="mb-3">{value.icon}</div>
                <h4 className="text-xl font-semibold text-black mb-2">
                  {value.title}
                </h4>
                <p className="text-black text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
