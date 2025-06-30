// src/components/Loader.js

import PropTypes from "prop-types";

const SpinnerLoader = ({
  src = "/spinner.svg",
  width = 200,
  height = 200,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <img
        src={src}
        width={width}
        height={height}
        alt="Loading..."
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
