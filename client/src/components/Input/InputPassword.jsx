import PropTypes from "prop-types";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputPassword = ({ className, autoFocus, value, onChange, id }) => {
  const [isHidden, setIsHidden] = useState(true);

  const onSwitchIsHidden = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <div className={className}>
        <div className="relative w-full max-w-xs my-3 py-1">
          <input
            id={id}
            type={isHidden ? "password" : "text"}
            placeholder=""
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
            password
          </label>
          <button
            type="button"
            onClick={onSwitchIsHidden}
            className="absolute right-2 top-2 text-gray-500"
          >
            {isHidden ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>
    </>
  );
};

InputPassword.propTypes = {
  className: PropTypes.string,
  pattern: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  id: PropTypes.string,
};

InputPassword.defaultProps = {
  autoFocus: false,
  value: "",
  onChange: () => {},
  id: "textfield",
};
export default InputPassword;
