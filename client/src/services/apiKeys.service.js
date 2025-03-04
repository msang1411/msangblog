import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/api-key";

const ApiKeysService = {
  getTinycmeEditorApiKey: async () => {
    try {
      const response = await axios.get(`${API_URL}/tinymce-editor-api-key`);

      return response;
    } catch (error) {
      return error;
    }
  },
};

export default ApiKeysService;
