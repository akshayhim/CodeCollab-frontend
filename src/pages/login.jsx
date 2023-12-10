// import React from "react";
import { Toaster } from "react-hot-toast";
import Login from "../components/Login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="mt-8 p-6 bg-white shadow-md rounded-md">
          <Login />
        </div>
        <Link to="/register" href="#" className="body2">
          {"Don't have an account? "}
          <span className="underline">Sign Up</span>
        </Link>
        <Toaster />
      </div>
    </>
  );
};

export default LoginPage;
