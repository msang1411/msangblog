import PropTypes from "prop-types";

const Button = ({ children, className, type, onClick, disabled, name }) => {
  return (
    <>
      <button
        type={type}
        className={`rounded-md px-4 py-2 w-auto transform active:scale-90 transition 
        font-[Poppins] font-bold text-white mx-auto bg-blue-300
                  ${className}`}
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

Button.defaultProps = {
  className: "",
  type: "button",
  onClick: () => {},
  disabled: false,
};

export default Button;
