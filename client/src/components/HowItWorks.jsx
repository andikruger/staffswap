import React from "react";

const HowItWorks = () => {
  return (
    <>
      <section id="how-it-works" className="container mx-auto my-16">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
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

          {/* Step 2 */}
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

          {/* Step 3 */}
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

          {/* Step 4 - Contact Staff Planning */}
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
