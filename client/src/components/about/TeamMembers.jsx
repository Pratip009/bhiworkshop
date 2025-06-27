import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const teamData = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    socials: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Michael Smith",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    socials: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sara Williams",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    socials: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "John Doe",
    role: "QA Engineer",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    socials: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

const TeamMembers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <p
            className="mt-8 text-base text-black sm:text-xl"
          
           
          >
            Our team is composed of passionate professionals committed to
            delivering innovative solutions, driving success, and fostering a
            collaborative environment. Each member brings unique expertise and a
            shared vision to achieve excellence together.
          </p>
          <h1
            className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Meet Our Team
            <span className="mr-2"></span>
            
          </h1>
        </div>
        <div className="mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
              <div className="flex justify-center mt-4 space-x-4">
                <a
                  href={member.socials.facebook}
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={member.socials.instagram}
                  className="text-gray-500 hover:text-pink-500 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href={member.socials.linkedin}
                  className="text-gray-500 hover:text-blue-800 transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
