// import React from 'react';
import Registration from "../components/Registration";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      <Registration />
      <Link to="/register" href="#" className="body2">
        {"Don't have an account? "}
        <span className="underline">Sign Up</span>
      </Link>
    </div>
  );
};

export default RegisterPage;
