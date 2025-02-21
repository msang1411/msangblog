import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/admin";

const AdminService = {
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
};

export default AdminService;
