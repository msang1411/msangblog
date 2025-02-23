import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../services/admin.service";
import statusCode from "../utils/statusCode";

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentAccessToken = localStorage.getItem("accessToken");
      if (!currentAccessToken) {
        navigate("/login");
        return;
      }

      try {
        const resAccessTokenVerify =
          await AdminService.checkAccessTokenExpired();

        if (resAccessTokenVerify.data.isExpired) {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            localStorage.removeItem("accessToken");
            navigate("/login");
            return;
          }

          const resRefreshToken = await AdminService.refreshToken();

          if (resRefreshToken.status === statusCode.OK) {
            localStorage.setItem(
              "accessToken",
              resRefreshToken.data.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              resRefreshToken.data.refreshToken
            );
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) return <p>Loading...</p>;

  return <>{children}</>;
};

PrivateLayout.propTypes = {
  children: PropTypes.node,
};

export default PrivateLayout;
