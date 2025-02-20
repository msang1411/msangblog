import PropTypes from "prop-types";

const InputStandard = ({
  children,
  className,
  type,
  isRequired,
  autoFocus,
  value,
  onChange,
  id,
}) => {
  return (
    <>
      <div className={className}>
        <div className="relative w-full max-w-xs my-3 py-1">
          <input
            id={id}
            type={type}
            placeholder=""
            required={isRequired}
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
            className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent 
            px-2 pb-2 text-gray-900 outline-none focus:border-blue-500"
          />
          <label
            htmlFor={id}
            className="absolute left-2 top-4 text-gray-500 transition-all pointer-events-none 
                peer-placeholder-shown:top-1 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400  peer-[:not(:placeholder-shown)]:-top-3 
                peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500
                peer-focus:-top-3 peer-focus:text-xs peer-focus:!text-blue-500 peer-focus:animate-fadeInOut"
          >
            {children}
          </label>
        </div>
      </div>
    </>
  );
};

InputStandard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  pattern: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  id: PropTypes.string,
};

InputStandard.defaultProps = {
  className: "",
  type: "text",
  isRequired: false,
  autoFocus: false,
  value: "",
  onChange: () => {},
  id: "textfield",
};
export default InputStandard;
