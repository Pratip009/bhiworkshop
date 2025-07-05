import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  
  FaTiktok,
} from "react-icons/fa";
import logo from "../../assets/images/favicon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, link: "#" },
    { name: "Twitter", icon: FaTwitter, link: "#" },
    { name: "Instagram", icon: FaInstagram, link: "#" },
    { name: "LinkedIn", icon: FaLinkedin, link: "#" },
    { name: "Tiktok", icon: FaTiktok, link: "#" },
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
    <footer
      className="py-10 bg-white shadow-[0_-2px_24px_0_rgba(62,198,224,0.08)] border-t border-gray-100 font-play"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
          {/* Logo & Social Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left">
            <img
              className="w-14 h-14 mb-4 bg-gray-800 rounded"
              src={logo}
              alt="Logo"
            />
            <p className="text-base text-gray-600 leading-relaxed mt-2">
              Online or in person,{" "}
              <span className="font-semibold text-[#144AB0]">
                Bright Horizon Institute
              </span>{" "}
              helps you gain real skills for real careers.
            </p>
            <ul className="flex items-center justify-center sm:justify-start space-x-3 mt-6">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.link}
                    title={social.name}
                    className="flex items-center justify-center text-[#144AB0] transition-all duration-200 bg-[#f4fafd] hover:bg-[#144AB0] hover:text-white focus:bg-[#144AB0] rounded-full w-10 h-10 shadow-sm"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2 text-center sm:text-left">
                {section.title}
              </p>
              <ul className="mt-4 space-y-3 text-center sm:text-left">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.url}
                      className="text-[15px] text-gray-600 hover:text-[#144AB0] transition-all duration-200 font-medium"
                      style={{ textDecoration: "none" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
              Contact Us
            </p>
            <div className="mt-4 text-[15px] text-gray-500 space-y-1">
              <p>591 Summit Ave, Suite No. 400</p>
              <p>Jersey City, New Jersey, NJ 07306</p>
              <p className="mt-2 font-semibold text-[#144AB0]">
                📞 201-377-1594
              </p>
              <p className="mt-1 font-semibold text-[#144AB0]">
                ✉️ admin@bhilearning.com
              </p>
            </div>
          </div>
        </div>

        <hr className="mt-12 mb-8 border-gray-200" />

        <p className="text-sm text-center text-gray-400 font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#144AB0] font-bold">
            Bright Horizon Institute
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
