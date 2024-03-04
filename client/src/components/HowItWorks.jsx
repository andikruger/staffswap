import React from "react";
import Image1 from "../assets/how_it_works_1.jpg";
import Image2 from "../assets/how_it_works_2.jpg";
import Image3 from "../assets/how_it_works_3.jpg";
import Image4 from "../assets/how_it_works_4.jpg";
const HowItWorks = () => {
  return (
    <>
      <section id="how-it-works" className="container mx-auto my-16">
        <h2 className="text-2xl  text-center font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={Image1}
                alt="Step 1"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-700">
                Sign up and join the StaffSwap community.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={Image2}
                alt="Step 2"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Post Your Shift</h3>
              <p className="text-gray-700">
                Easily post your shift for exchange with other members.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={Image3}
                alt="Step 3"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Swap and Confirm</h3>
              <p className="text-gray-700">
                Browse available shifts, swap, and confirm the exchange.
              </p>
            </div>
          </div>

          {/* Step 4 - Contact Staff Planning */}
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={Image4}
                alt="Contact Staff Planning"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Contact Staff Planning</h3>
              <p className="text-gray-700">
                Reach out to staff planning for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
