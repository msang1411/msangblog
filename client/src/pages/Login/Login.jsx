import { useState } from "react";
import { useNavigate } from "react-router-dom";
import statusCode from "../../utils/statusCode";
import AdminService from "../../services/admin.service";
import InputStandard from "../../components/Input/InputStandard";
import InputPassword from "../../components/Input/InputPassword";
import Button from "../../components/Button/Button";
import bgImage from "../../assets/img/login-background.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const onUsernameChange = (event) => setUsername(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AdminService.login(username, password);

      if (
        response.status === statusCode.UNAUTHORIZED ||
        response.status === statusCode.BAD_REQUEST
      ) {
        setErrorAlert(response.data.message);
        setIsIncorrect(true);
      }

      if (response.status === statusCode.OK) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorAlert("something wrong!");
      setIsIncorrect(true);
    }
  };

  return (
    <>
      <div
        className="w-full h-screen  bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex justify-center items-center flex-col">
          <div
            className="w-96 mt-20 bg-slate-100 flex justify-center flex-col items-center pt-8 
          rounded-lg drop-shadow-2xl"
          >
            <h1 className="text-black text-5xl my-8 font-[Poppins] ">Login</h1>
            <div className="flex justify-center flex-col w-full px-12">
              <InputStandard
                type="text"
                isRequired={true}
                value={username}
                onChange={onUsernameChange}
              >
                username
              </InputStandard>
              <InputPassword value={password} onChange={onPasswordChange} />
              {isIncorrect && (
                <p className={"mt-4 mb-4 mx-auto text-red-500"}>{errorAlert}</p>
              )}
              <Button
                onClick={handleLogin}
                className={
                  "bg-gradient-to-r from-cyan-200 to-violet-500 my-10 shadow-md shadow-orange-200"
                }
              >
                Login
              </Button>
            </div>
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
