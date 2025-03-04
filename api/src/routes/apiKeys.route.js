const express = require("express");
const router = express.Router();
const { getTinymceEditorApiKey } = require("../controllers/apiKeys.controller");

router.route("/tinymce-editor-api-key").get(getTinymceEditorApiKey);

module.exports = router;
