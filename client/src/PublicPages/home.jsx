import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/PublicHeader";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
const Home = () => {
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
            <p className="text-sm md:text-lg mb-4 px-2">
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
          {/* or log in */}
          <p className="text-lg mb-8">or</p>
          <a
            href="/login"
            className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-400 no-underline"
          >
            Log In
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
