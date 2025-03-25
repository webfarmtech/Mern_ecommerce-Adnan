import { Link } from "react-router-dom";

const ToggleText = ({ currenState, setCurrentState, loginContent }) => (
  <div className="w-full flex justify-end text-sm mt-[8px]  hover:text-blue-800 underline hover:scale-100">
    {currenState === "Login" ? (
      <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
        {loginContent.createAccount}
      </p>
    ) : (
      <p className="cursor-pointer" onClick={() => setCurrentState("Login")}>
        {loginContent.login}
      </p>
    )}
  </div>
);

export default ToggleText;
