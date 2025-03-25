import { useContext, useEffect, useState } from "react";
import { loginContent } from "../constant";
import { SectionWrapper } from "../hoc";
import { InputField, ToggleText } from "../components";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [currenState, setCurrentState] = useState("Login");
  const { token, setToken, backendurl, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const decoded = jwtDecode(credentialResponse.credential);

  //     // Store email in localStorage for logout
  //     localStorage.setItem("email", decoded.email);

  //     // Send user data to backend
  //     const response = await axios.post(
  //       `${backendurl}/api/google/google-auth`,
  //       {
  //         email: decoded.email,
  //         name: decoded.name,
  //         googleId: decoded.sub,
  //       }
  //     );

  //     if (response.data.success) {
  //       setToken(response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //       toast.success("Successfully logged in with Google");
  //     }
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //     toast.error("Failed to login with Google");
  //   }
  // };

  // const handleGoogleError = () => {
  //   toast.error("Google login failed");
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currenState === "Sign Up") {
        console.log(currenState);

        // Sign Up
        const response = await axios.post(`${backendurl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      } else {
        // Login
        const response = await axios.post(`${backendurl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currenState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currenState === "Login" ? null : (
        <InputField
          type="text"
          placeholder={loginContent.placeholders.name}
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}

      <InputField
        type="email"
        placeholder={loginContent.placeholders.email}
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <InputField
        type="password"
        placeholder={loginContent.placeholders.password}
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className="flex items-center justify-between w-full">
        {" "}
        <Link
          to="/forgot-password"
          className="flex no-wrap text-sm text-gray-600 hover:text-blue-800 underline"
        >
          Forgot Password?
        </Link>
        <ToggleText
          currenState={currenState}
          setCurrentState={setCurrentState}
          loginContent={loginContent}
        />
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button className="w-full bg-black text-white font-light px-8 py-2 mt-4">
          {currenState === "Login"
            ? loginContent.buttonText.login
            : loginContent.buttonText.signUp}
        </button>

        {/* <div className="relative w-full text-center my-4">
          <hr className="border-gray-300" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
            OR
          </span>
        </div>

        <div className="mx-auto">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            width="100%"
            theme="outline"
            text={
              currenState === "Login"
                ? "Sign in with Google"
                : "Sign up with Google"
            }
          />
        </div> */}
      </div>
    </form>
  );
};

export default SectionWrapper(Login, "login");
