// src/components/Loader.js

import PropTypes from "prop-types";

const SpinnerLoader = ({
  src = "/loaderanimation.webm",
  width = 200,
  height = 200,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <video
        src={src}
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

SpinnerLoader.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default SpinnerLoader;
