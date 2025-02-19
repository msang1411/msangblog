import bgImage from "../../assets/img/login-backgound.jpg";
import InputStandard from "../../components/Input/InputStandard";

const Login = () => {
  return (
    <>
      <div
        className="w-full h-screen  bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex justify-center items-center flex-col">
          <div className="w-96 mt-20 bg-white flex justify-center flex-col items-center pt-8 rounded-lg">
            <h1 className="text-black uppercase font-bold text-3xl my-8">
              Login
            </h1>
            <form>
              <InputStandard type="text" isRequired={true}>
                username
              </InputStandard>
              <button type="submit">submit</button>
            </form>

            <a>change password</a>
            <button>Login</button>
            <p>alert</p>
          </div>
          <div className=" bg-gray-100 mt-14 p-14 flex justify-center">
            <div className="relative w-full max-w-xs">
              <input
                id="textfield"
                type="text"
                placeholder=" "
                className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-2 pb-2 text-gray-900 outline-none focus:border-blue-500"
              />
              <label
                htmlFor="textfield"
                className="absolute left-2 top-4 text-gray-500 transition-all 
                peer-placeholder-shown:top-1 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs
                peer-focus:text-blue-500   peer-[:not(:placeholder-shown)]:-top-3 
                peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-500"
              >
                Input here
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
