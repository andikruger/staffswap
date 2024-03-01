import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/PublicHeader";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Hero from "../components/Hero";
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
