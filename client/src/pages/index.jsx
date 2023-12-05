import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useMsal, MsalProvider } from "@azure/msal-react";
import sha256 from "crypto-js/sha256";
import axios from "axios";
const Home = () => {
  const { instance, accounts } = useMsal();
  // log instance and accounts to console

  console.log("username", accounts[0].username);
  console.log("name", accounts[0].name);

  const checkIfNewUser = () => {
    // hash accounts[0].username with SHA256
    // then check if the hash exists in the database
    // if it doesn't, then create a new user redirect to the profile page

    // create a sha256 hash of the username
    const hash = sha256(accounts[0].username).toString();

    // check if the hash exists in the database api endpoint https://staffswap-backend.onrender.com/api/v1/user/username/:hash
    axios
      .get(
        `https://staffswap-backend.onrender.com/api/v1/user/username/${hash}`
      )
      .then((res) => {
        console.log("res", res);
        // if it doesn't, then create a new user redirect to the profile page
        if (!res.data.data) {
          // create a new user
          sessionStorage.setItem("newUser", "true");
          sessionStorage.setItem("uuid", hash);
          // redirect to the profile page
          window.location.href = "/profile";
        } else {
          sessionStorage.setItem("user", res.data.data._id);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Display a toast notification on successful log in
  useEffect(() => {
    if (
      accounts.length > 0 &&
      sessionStorage.getItem("WecomeToast") !== "true"
    ) {
      toast.success(`Welcome ${accounts[0].name}`);
    }
    sessionStorage.setItem("WecomeToast", "true");
    checkIfNewUser();
    localStorage.clear();
  }, [accounts]);
  return (
    <>
      <Helmet>
        <title>StaffSwap</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />

      <section className="hero">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/4 max-w-screen-md overflow-y-auto">
          <div className="opacity-100">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              StaffSwap
            </h1>
            <p className="text-sm md:text-lg mb-4">
              Your Marketplace for Seamless Shift Exchanges
            </p>
            <a
              href="#how-it-works"
              className="bg-[#e0211a] text-white py-2 px-4 rounded-full hover:bg-[#b41813] no-underline text-sm"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto my-16">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Step 1"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-700">
                Sign up and join the StaffSwap community.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Step 2"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Post Your Shift</h3>
              <p className="text-gray-700">
                Easily post your shift for exchange with other members.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1452697620382-f6543ead73b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Step 3"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Swap and Confirm</h3>
              <p className="text-gray-700">
                Browse available shifts, swap, and confirm the exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e0211a] text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join StaffSwap Today!</h2>
          <p className="text-lg mb-8">
            Experience the convenience of seamless shift exchanges in the
            StaffSwap community.
          </p>
          <a
            href="/login"
            className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-400 no-underline"
          >
            Sign Up Now
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
