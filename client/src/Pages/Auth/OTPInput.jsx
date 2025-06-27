import PropTypes from 'prop-types';

const OTPInput = ({ value, onChange }) => {
  return (
    <div className="flex space-x-2 justify-center">
      {Array(6)
        .fill("")
        .map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value[index] || ""}
            onChange={(e) => {
              const newValue = value.split("");
              newValue[index] = e.target.value;
              onChange(newValue.join(""));
            }}
            className="w-10 h-10 text-center border border-gray-300 rounded-md"
          />
        ))}
    </div>
  );
};

OTPInput.propTypes = {
  value: PropTypes.string.isRequired,    // Ensures 'value' is a string
  onChange: PropTypes.func.isRequired,   // Ensures 'onChange' is a function
};

export default OTPInput;
