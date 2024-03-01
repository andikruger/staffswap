import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Hero from "../components/Hero";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import sha256 from "crypto-js/sha256";
import axios from "axios";

const Home = () => {
  const { accounts } = useMsal();
  // log instance and accounts to console

  const checkIfNewUser = () => {
    // hash accounts[0].username with SHA256
    // then check if the hash exists in the database
    // if it doesn't, then create a new user redirect to the profile page

    // create a sha256 hash of the username
    const hash = sha256(accounts[0].username).toString();

    // check if the hash exists in the database api endpoint https://lucky-red-robe.cyclic.app/user/username/:hash
    axios
      .get(`https://lucky-red-robe.cyclic.app/user/username/${hash}`)
      .then((res) => {
        // if it doesn't, then create a new user redirect to the profile page
        if (!res.data.data) {
          // create a new user
          sessionStorage.setItem("newUser", "true");
          sessionStorage.setItem("uuid", hash);
          // redirect to the profile page
          window.location.href = "/profile";
        } else {
          sessionStorage.setItem("user", res.data.data._id);
          sessionStorage.setItem("role", res.data.data.role);
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

      <Hero />

      <HowItWorks />

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
