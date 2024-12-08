import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useAuthStore } from "../store/useAuthStore"; // Updated to use `useAuthStore`
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setLogin] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, login, signup, connectSocket, socket } = useAuthStore(); // Access functions and state from the store

  const handleLogin = async () => {
    try {
      await login({ emailId, password }); // Use `login` function from `useAuthStore`

      // Dispatch user data to Redux store
      dispatch(addUser(authUser));

      // Initialize socket connection
      connectSocket();

      navigate("/"); // Redirect after successful login
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message || "Login failed, please try again."
      );
    }
  };

  const handleSign = async () => {
    try {
      await signup({ firstName, lastName, emailId, password }); // Use `signup` function from `useAuthStore`

      // Dispatch user data to Redux store
      dispatch(addUser(authUser));

      // Initialize socket connection
      connectSocket();

      navigate("/profile"); // Redirect after successful sign-up
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(
        err?.response?.data?.message || "Sign-up failed, please try again."
      );
    }
  };

  useEffect(() => {
    if (authUser?.token && !socket) {
      connectSocket(); // Connect socket if user is authenticated
    }
  }, [authUser,navigate, socket]);

  return (
    <div className="flex min-h-screen justify-center">
      <div className={`card my-2 md:w-96 w-80 h-full shadow-xl dark:bg-base-200`}>
        <div className="card-body">
          <h2 className="card-title justify-center text-blue-400 font-extrabold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <div>
          {!isLogin && (
            <div>
              <InputField
                label="First Name"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={setFirstName}
              />
              <InputField
                label="Last Name"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={setLastName}
              />
            </div>
          )}
          <InputField
            label="Email ID"
            placeholder="Enter your email Id"
            value={emailId}
            onChange={setEmailId}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={setPassword}
          />
</div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={() => (isLogin ? handleLogin() : handleSign())}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer"
            onClick={() => setLogin((prev) => !prev)}
          >
            {isLogin
              ? "New user? Sign up here"
              : "Already have an account? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, value, onChange, type = "text" }) => (
  <label className="form-control w-full max-w-xs my-1">
    <div className="label">
      <span className="label-text text-blue-400 font-medium">{label}:</span>
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className="input input-bordered text-white font-bold w-full max-w-xs"
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

export default Login;
