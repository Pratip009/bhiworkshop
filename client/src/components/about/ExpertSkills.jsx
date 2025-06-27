import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import expertImg from "../../assets/images/bhi11.jpg";
const ExpertSkills = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/courses");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-white">
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div data-aos="fade-right">
              <span
                className="text-sm text-red-500 font-semibold"
                data-aos="fade-up"
              >
                ABOUT US
              </span>

              <h1
                className="text-4xl font-bold text-black sm:text-lg lg:text-7xl"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Bright Horizon Institute – Your Career Starts Here
                <span className="mr-2"></span>
              </h1>

              <p
                className="mt-8 text-base text-black sm:text-md"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Located in the heart of Jersey City, Bright Horizon Institute is
                more than just a vocational school—we’re a committed partner in
                your career development. Since 2010, we’ve empowered students to
                acquire practical skills, earn National industry-recognized
                certifications, and build the foundation for successful,
                long-lasting careers. Our goal is not only to equip you with the
                knowledge you need but to actively connect you to the workforce,
                ensuring you&apos;re ready to thrive in your chosen field.
                Whether you study online or in person, our flexible, hands-on
                programs are designed to fit your life and propel your career
                forward. We offer training in high-demand fields like
                healthcare, business, technology, and more—always focused on the
                skills employers need and the education students deserve. What
                sets us apart? We’re with you every step of the way, providing
                the guidance and support you need from day one to job placement
                and beyond. Through our partnerships with trusted organizations
                and local employers, we ensure you have the resources and
                connections to find your place in the workforce. At Bright
                Horizon, you’re more than just a student—you’re someone we’re
                invested in. We provide the tools, support, and opportunities to
                help you unlock your full potential.
              </p>

              <p
                className="mt-2 text-lg text-black-600 sm:mt-8 font-bold"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                Your future is within reach. Let’s build it—together.
              </p>

              <button
                onClick={handleClick}
                type="button"
                className="px-6 py-3 text-lg font-semibold text-white bg-[#F97316] rounded-lg shadow-md transition-all duration-300 hover:bg-[#DE6006FF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                data-aos="zoom-in"
                data-aos-delay="1000"
              >
                Explore Learning
              </button>
            </div>

            <div data-aos="fade-left" data-aos-delay="500">
              <img
                className="w-full rounded-lg"
                src={expertImg}
                alt="Hero Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertSkills;
