import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import ApiKeysService from "../../services/apiKeys.service";

const TinyMCEEditor = ({ onContentChange = () => {}, initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);
  const [apiKey, setApiKey] = useState("");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onContentChange(newContent);
  };

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const response = await ApiKeysService.getTinycmeEditorApiKey();
        console.log(response);
        setApiKey(response.headers["x-tinymce-api-key"]);
      } catch (error) {
        alert("Unable to get tinymce editor api key. ", error);
      }
    };

    getApiKey();
  }, []);

  return (
    <div className="flex flex-col">
      {apiKey ? (
        <Editor
          apiKey={apiKey}
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 300,
            menubar: false,
            plugins: "lists link autolink image table code",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | link image |code",
            link_default_target: "_blank",
            link_assume_external_targets: true,
          }}
        />
      ) : (
        <p>editor loading...</p>
      )}
    </div>
  );
};

TinyMCEEditor.propTypes = {
  onContentChange: PropTypes.func,
  initialContent: PropTypes.string,
};

export default TinyMCEEditor;
