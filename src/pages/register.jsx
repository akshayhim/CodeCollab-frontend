// import React from 'react';
import Registration from "../components/Registration";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-7.16rem)] flex flex-col items-center justify-center bg-gray-100">
      <Registration />
      <Link to="/register" href="#" className="body2">
        {"Don't have an account? "}
        <span className="underline">Sign Up</span>
      </Link>
    </div>
  );
};

export default RegisterPage;
