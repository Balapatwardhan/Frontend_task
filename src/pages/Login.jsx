import React from "react";
import { useState } from "react";
import AuthForm from "../components/AuthForm";


const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const switchAuth = () => {
    setIsSignUp(!isSignUp);
  };

  return <AuthForm type={isSignUp ? "signup" : "login"} switchAuth={switchAuth} />;
};

export default AuthPage;
