import React from "react";
import AuthWrapper from "../Components/AuthWrapper";
import illustrationLogin from "../../../Assets/illustrationLogin.svg";
import LoginForm from "../Login/LoginForm";

const Login = () => {
  return <AuthWrapper illustration={illustrationLogin} form={<LoginForm />} />;
};

export default Login;
