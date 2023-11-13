import React from "react";
// import props from react router
import Header from "../components/Header";
import Footer from "../components/Footer";
const HelloWorld = () => {
  return (
    <>
      <Header />

      <section class="hero">
        <div>
          <h1 class="text-4xl font-bold mb-4">Staff Swap</h1>
          <p class="text-lg mb-8">
            Your Marketplace for Seamless Shift Exchanges
          </p>
          <a
            href="#how-it-works"
            class="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
          >
            How It Works
          </a>
        </div>
      </section>

      <section id="how-it-works" class="container mx-auto my-16">
        <h2 class="text-2xl font-bold mb-8">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://source.unsplash.com/800x600/?office"
                alt="Step 1"
                class="mx-auto mb-4 rounded-full"
              />
              <h3 class="text-xl font-bold mb-2">Create an Account</h3>
              <p class="text-gray-700">
                Sign up and join the Staff Swap community.
              </p>
            </div>
          </div>

          <div class="text-center">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://source.unsplash.com/800x600/?work"
                alt="Step 2"
                class="mx-auto mb-4 rounded-full"
              />
              <h3 class="text-xl font-bold mb-2">Post Your Shift</h3>
              <p class="text-gray-700">
                Easily post your shift for exchange with other members.
              </p>
            </div>
          </div>

          <div class="text-center">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://source.unsplash.com/800x600/?team"
                alt="Step 3"
                class="mx-auto mb-4 rounded-full"
              />
              <h3 class="text-xl font-bold mb-2">Swap and Confirm</h3>
              <p class="text-gray-700">
                Browse available shifts, swap, and confirm the exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-blue-500 text-white py-16">
        <div class="container mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Join Staff Swap Today!</h2>
          <p class="text-lg mb-8">
            Experience the convenience of seamless shift exchanges in the Staff
            Swap community.
          </p>
          <a
            href="#signup"
            class="bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-gray-200"
          >
            Sign Up Now
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HelloWorld;
