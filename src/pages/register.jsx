// import React from 'react';
import Registration from "../components/Registration";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <Registration />
      <Link to="/login" href="#" className="body2">
        {"Already have an account? "}
        <span className="underline">Log In</span>
      </Link>
    </div>
  );
};

export default RegisterPage;
