import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TinyMCEEditor from "../../components/Editor/TinyMCEEditor";
import Button from "../../components/Button/Button";

const NewPost = () => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    console.log(content);
  };

  return (
    <>
      <div className="h-screen w-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col justify-center lg:mx-48 xl:mx-80 ">
          <h1 className="text-4xl font-bold mx-auto mt-6 mb-6 font-[Poppins]">
            Create new post
          </h1>
          <div>
            <TinyMCEEditor onContentChange={setContent} />
            <div className="w-full flex justify-end">
              <Button
                className="my-4 mr-8 bg-gradient-to-r from-blue-300 to-pink-500 shadow-xl"
                onClick={handlePost}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
