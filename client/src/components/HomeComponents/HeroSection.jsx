import { useEffect, useRef } from "react";
import "./HeroSection.css"; // Ensure CSS is imported separately

// Define videos with titles and descriptions
const videos = [
  {
    src: "https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4",
    title: "Healthcare Excellence",
    description: "Empowering students with top-tier healthcare education.",
  },
  {
    src: "https://videos.pexels.com/video-files/5536733/5536733-uhd_2560_1440_25fps.mp4",
    title: "Advanced Medical Training",
    description: "Gain hands-on experience with industry-leading instructors.",
  },
  {
    src: "https://videos.pexels.com/video-files/6209572/6209572-uhd_2732_1440_25fps.mp4",
    title: "Career-Oriented Courses",
    description: "Get certified and secure job placement assistance.",
  },
  {
    src: "https://videos.pexels.com/video-files/7945680/7945680-hd_1920_1080_25fps.mp4",
    title: "Join the Bright Horizon",
    description: "Start your journey toward a successful medical career today!",
  },
];

const HeroSection = () => {
  const listRef = useRef(null);
  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null);

  let timeRunning = 3000;
  let timeAutoNext = 7000;

  useEffect(() => {
    resetTimeAnimation();
    const runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => clearTimeout(runNextAuto);
  }, []);

  const resetTimeAnimation = () => {
    if (runningTimeRef.current) {
      runningTimeRef.current.style.animation = "none";
      void runningTimeRef.current.offsetHeight; // Trigger reflow
      runningTimeRef.current.style.animation =
        "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    if (!listRef.current || !carouselRef.current) return;
    const sliderItemsDom = listRef.current.querySelectorAll(".item");
    if (type === "next") {
      listRef.current.appendChild(sliderItemsDom[0]);
      carouselRef.current.classList.add("next");
    } else {
      listRef.current.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      carouselRef.current.classList.remove("next", "prev");
    }, timeRunning);

    resetTimeAnimation();
  };

  return (
    <div className="carousel relative z-[1]" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {videos.map((video, index) => (
          <div key={index} className="item">
            <video
              className="video"
              src={video.src}
              autoPlay
              loop
              muted
            ></video>
            <div className="content">
              <div className="title">{video.title}</div>
              <div className="des">{video.description}</div>
              <div className="btn">
                <button>See More</button>
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button className="prev" onClick={() => showSlider("prev")}>
          &lt;
        </button>
        <button className="next" onClick={() => showSlider("next")}>
          &gt;
        </button>
      </div>
      <div className="timeRunning" ref={runningTimeRef}></div>
    </div>
  );
};

export default HeroSection;
