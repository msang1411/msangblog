import bgImage from "../../assets/img/login-background.jpg";
import InputStandard from "../../components/Input/InputStandard";
import Button from "../../components/Button/Button";

const Login = () => {
  return (
    <>
      <div
        className="w-full h-screen  bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex justify-center items-center flex-col">
          <div
            className="w-96 mt-20 bg-slate-100 flex justify-center flex-col items-center pt-8 
          rounded-lg shadow-md"
          >
            <h1 className="text-black text-3xl my-8 font-[Poppins]">Login</h1>
            <form className="flex justify-center flex-col w-full px-12">
              <InputStandard type="text" isRequired={true}>
                username
              </InputStandard>
              <InputStandard type="password" isRequired={true}>
                password
              </InputStandard>
              <Button
                type="submit"
                className={"bg-gradient-to-r from-cyan-200 to-violet-500 my-10"}
              >
                Login
              </Button>
            </form>
            <p className={"mt-12 mb-4 text-purple-500"}>
              For admin and writers only
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
