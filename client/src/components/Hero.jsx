import React from "react";

const Hero = () => {
  // create a function to choose a random image from the assets folder the names are hero_1.jpg, hero_2.jpg, hero_3.jpg and hero_4.jpg hero_5.jpg hero_6.jpg
  // then set the background image of the hero section to the random image
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(/assets/hero_${
          Math.floor(Math.random() * 6) + 1
        }.jpg)`,
      }}
    >
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
  );
};

export default Hero;
