const statusCode = require("../utils/statusCode");
const { TINYMCE_EDITOR_API_KEY } = require("../configs/index");

const getTinymceEditorApiKey = async (req, res, next) => {
  try {
    res.setHeader("Access-Control-Expose-Headers", "X-TINYMCE-API-KEY");
    res.setHeader("X-TINYMCE-API-KEY", TINYMCE_EDITOR_API_KEY);
    return res.status(statusCode.OK).json({
      message: "successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTinymceEditorApiKey,
};
