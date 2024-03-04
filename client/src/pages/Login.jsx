import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/PublicHeader";
import { useMsal, MsalProvider } from "@azure/msal-react";
import { loginRequest } from "../auth-config";

const Login = () => {
  const { instance } = useMsal();
  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((e) => {
        console.error(e);
      });
  };
  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);
  return (
    <>
      <Helmet>
        <title>StaffSwap | Login</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-[#e0211a]">
          Redirecting you to the Login page
        </div>
      </div>
    </>
  );
};

export default Login;
