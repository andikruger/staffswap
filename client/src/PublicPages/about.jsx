import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/PublicHeader";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <title>StaffSwap | About</title>
        <meta
          name="description"
          content="Learn more about StaffSwap, the independent Shift Exchange Platform for shift workers."
        />
        <meta
          name="keywords"
          content="StaffSwap, shift exchange, work platform"
        />
        <meta name="author" content="StaffSwap" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div className="text-4xl font-bold text-[#e0211a] mb-6">
          About Staff Swap
        </div>

        <div className="max-w-[800px] text-lg text-[#333] leading-7">
          <p>
            Staff Swap is an independent Shift Exchange Platform created for
            shift workers. With the approval of your company, we welcome you to
            create a profile using your company’s email to access your company’s
            shift plan and post, or match your exchange wishes.
          </p>

          <p className="mt-4">
            Please adhere to the following rule so that we can keep this
            exchange platform for your shift work:
          </p>

          <p className="text-red-500 font-bold mt-2">
            ATTENTION: Please DO NOT post any internal company information or
            post any questions that do not pertain to shift exchange. This
            platform shall only be used for shift exchanges or to discuss the
            circumstances surrounding an exchange.
          </p>

          <p className="mt-4">
            At this time, this platform is not a communication APP for anything
            other than shift exchanges. We hope to offer you other communication
            possibilities in the future and welcome any suggestions you may have
            by contacting the APP creators{" "}
            <NavLink
              className="text-[#e0211a]  hover:text-[#b41813] no-underline font-bold"
              to={"mailto:lizalabeida.lipton@austrian.com"}
            >
              here
            </NavLink>{" "}
            .
          </p>

          <p className="mt-4">
            With that in mind, Happy Swapping, and may you swap the shift that
            suits you best!
          </p>

          <p className="mt-6">
            <span className="font-bold">Liza Lipton</span>
            <br />
            (App Creator/ Management)
          </p>

          <p className="mt-4">
            <span className="font-bold">Andreas Krüger</span>
            <br />
            (Developer/ IT Technical Support)
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
