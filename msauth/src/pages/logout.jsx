import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/PublicHeader";
import { useMsal, MsalProvider } from "@azure/msal-react";
import { loginRequest } from "../auth-config";

const Logout = () => {
  const { instance, accounts } = useMsal();

  const handleLogout = () => {
    // instance.logout({
    //   account: accounts[0], // You may need to adjust this based on your application's needs
    //   postLogoutRedirectUri: "/", // Redirect to home page after logout
    // });
    // sessionStorage.removeItem("WecomeToast");
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <>
      <Helmet>
        <title>StaffSwap | Logout</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-blue-500">Logging you out</div>
      </div>
    </>
  );
};

export default Logout;
