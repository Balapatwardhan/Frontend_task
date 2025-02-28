import { useState } from "react";
import React from "react";

const AuthForm = ({ type, switchAuth }) => {
  const isSignUp = type === "signup";
  
  return (
    <div className="flex min-h-screen w-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 to-indigo-900 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold">CodeSquid</h1>
        <p className="text-lg mt-4">Online Community For Front-end Developers</p>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-bold mb-6">
          {isSignUp ? "Join & Connect the Fastest Growing Online Community" : "Welcome Back"}
        </h2>
        
        {/* OAuth Buttons */}
        <div className="flex space-x-4">
          <button className="bg-purple-500 text-white border p-2 rounded-lg flex items-center gap-2">
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /> Sign {isSignUp ? "up" : "in"} with Google
          </button>
          <button className="bg-purple-500 text-white border p-2 rounded-lg flex items-center gap-2">
            <img src="https://img.icons8.com/ios-glyphs/24/github.png" alt="GitHub" /> Sign {isSignUp ? "up" : "in"} with GitHub
          </button>
        </div>
        
        {/* Form */}
        <form className="w-full max-w-md mt-6">
          {isSignUp && (
            <input type="text" placeholder="Username" className="w-full p-3 border rounded-md mb-4" />
          )}
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-md mb-4" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-md mb-4" />
          
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              I accept the terms & conditions
            </label>
          </div>
          
          <button className="w-full bg-purple-600 text-white p-3 rounded-md mt-4 hover:bg-purple-700 font-semibold">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        
        {/* Toggle between Sign Up / Login */}
        <p className="mt-4 text-sm">
          {isSignUp ? "Own an account?" : "Don't have an account?"}{" "}
          <span className="text-purple-600 cursor-pointer font-medium" onClick={switchAuth}>
            {isSignUp ? "Jump Right In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;