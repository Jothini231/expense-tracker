import React, { useContext, useState, useEffect } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberMeEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    //login api call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });
      const {token , user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        
        if (rememberMe) {
          localStorage.setItem("rememberMeEmail", email);
        } else {
          localStorage.removeItem("rememberMeEmail");
        }

        updateUser(user);
        navigate("/dashboard");
      }
    }catch (error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong.try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center w-full">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome Back</h3>
          <p className="text-sm text-gray-500 mt-2">
            Please enter your details to log in
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 6 characters"
            type="password"
          />

          <div className="flex items-center justify-between mb-5 mt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
          </div>

          {error && <p className="text-expense text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOG IN
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
