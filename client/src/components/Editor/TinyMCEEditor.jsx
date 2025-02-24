import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const TinyMCEEditor = ({ onContentChange = () => {}, initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div className="flex flex-col">
      <Editor
        apiKey="xv822zp755pwuvclj772xgw93lmkt4hbl4ti1locxdvlfaew"
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
    </div>
  );
};

TinyMCEEditor.propTypes = {
  onContentChange: PropTypes.func,
  initialContent: PropTypes.string,
};

export default TinyMCEEditor;
