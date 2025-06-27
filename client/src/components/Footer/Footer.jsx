import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import logo from "../../assets/slider/newlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, link: "#" },
    { name: "Twitter", icon: FaTwitter, link: "#" },
    { name: "Instagram", icon: FaInstagram, link: "#" },
    { name: "LinkedIn", icon: FaLinkedin, link: "#" },
    { name: "GitHub", icon: FaGithub, link: "#" },
  ];

  const sections = [
    {
      title: "Important Pages",
      links: [
        { name: "About", url: "#" },
        { name: "Features", url: "#" },
        { name: "Privacy & Policy", url: "/privacy-policy" },
        { name: "Terms & Conditions", url: "/terms-and-conditions" },
      ],
    },
    {
      title: "Courses Categories",
      links: [
        { name: "Healthcare", url: "#" },
        { name: "Programming", url: "#" },
        { name: "Networking", url: "#" },
        { name: "Management", url: "#" },
      ],
    },
  ];

  return (
    <footer className="py-10 bg-gray-50 sm:pt-16 lg:pt-24 font-[Nunito]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <img className="w-auto h-14" src={logo} alt="Logo" />
            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Online or in person, Bright Horizon Institute helps you gain real
              skills for real careers. Learn fast, train smart, and step into
              the workforce with confidence. We’re here for you!
            </p>
            <ul className="flex items-center space-x-3 mt-9">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.link}
                    title={social.name}
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-8 h-8 hover:bg-blue-600 focus:bg-blue-600"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <p className="text-sm font-semibold tracking-widest text-gray-400 ">
                {section.title}
              </p>
              <ul className="mt-6 space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.url}
                      className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                      style={{ textDecoration: "none" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address Section */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 ">
              Contact Us
            </p>
            <div className="mt-6 text-base text-gray-600">
              <p>591 Summit Ave, Suite No. 400</p>
              <p>Jersey City, New Jersey, NJ 07306</p>
              <p className="mt-2">📞 201-377-1594</p>
              <p className="mt-1">✉️ admin@bhilearning.com</p>
            </div>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by Bright
          Horizon Institute
        </p>
      </div>
    </footer>
  );
};

export default Footer;
