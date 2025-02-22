import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/admin";

const AdminService = {
  checkAccessTokenExpired: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${API_URL}/verify-access-token`, {
        headers,
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        data: { username, password },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        Authorization: `Bearer ${refreshToken}`,
      };

      const response = await axios.get(`${API_URL}/refresh-token`, {
        headers,
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default AdminService;
