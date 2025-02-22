import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <div>This is Homepage</div>
      <button onClick={handleLogout} className="border-spacing-1">
        Logout
      </button>
    </>
  );
};

export default Login;
