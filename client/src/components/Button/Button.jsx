import PropTypes from "prop-types";

const Button = ({
  children = "",
  className,
  type = "button",
  onClick = () => {},
  disabled = false,
  name,
}) => {
  return (
    <>
      <button
        type={type}
        className={`rounded-md w-fit px-4 py-2 transform active:scale-90 transition 
        font-[Poppins] font-bold text-white bg-blue-300 ${className}`}
        onClick={onClick}
        disabled={disabled}
        name={name}
      >
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default Button;
