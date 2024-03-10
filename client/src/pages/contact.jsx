import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>StaffSwap | Contact</title>
        <meta
          name="description"
          content="Contact page for StaffSwap, the independent Shift Exchange Platform for shift workers."
        />
        <meta
          name="keywords"
          content="StaffSwap, shift exchange, work platform, contact"
        />
        <meta name="author" content="StaffSwap" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div className="text-4xl font-bold text-[#e0211a] mb-6">Contact Us</div>

        <div className="max-w-[800px] text-lg text-[#333] leading-7">
          <p>You can contact us via the following email addresses:</p>

          <ul className="list-disc mt-4 ml-6">
            <li>
              <a
                className="text-[#e0211a] hover:text-[#b41813] font-bold"
                href="mailto:lizalabeida.lipton@austrian.com"
              >
                Liza Lipton
              </a>
            </li>
            <li>
              <a
                className="text-[#e0211a] hover:text-[#b41813] font-bold"
                href="mailto:andreas.krueger@austrian.com"
              >
                Andreas Kr&uuml;ger
              </a>
            </li>
            <li>
              <a
                className="text-[#e0211a] hover:text-[#b41813] font-bold"
                href="mailto:staffplanning@example.com"
              >
                Staff Planning
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
