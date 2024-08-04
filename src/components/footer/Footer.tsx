import React from "react";
import { NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="w-full min-h-[505px] bg-white border-t border-black/20 flex flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-screen-xl px-4 py-12 grid grid-cols-1 cos:grid-cols-3 gap-10 md:gap-20">
        <div className="flex flex-col items-start gap-6 md:gap-12">
          <h1 className="text-black text-2xl font-bold font-poppins mb-4">
            Funiro.
          </h1>
          <address className="text-[#9f9f9f] text-base font-normal font-poppins not-italic">
            400 University Drive Suite 200 Coral <br /> Gables,
            <br />
            FL 33134 USA
          </address>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          <div className="flex flex-col mb-8 md:mb-0 gap-6 md:gap-[46px]">
            <h2 className="text-[#9f9f9f] text-base font-medium font-poppins mb-4">
              Links
            </h2>
            <NavLink
              to="/"
              className="text-black text-base font-medium font-poppins"
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="text-black text-base font-medium font-poppins"
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className="text-black text-base font-medium font-poppins"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-black text-base font-medium font-poppins"
            >
              Contact
            </NavLink>
          </div>
          <div className="flex flex-col gap-6 md:gap-[46px]">
            <h2 className="text-[#9f9f9f] text-base font-medium font-poppins mb-4">
              Help
            </h2>
            <NavLink
              to="/payment-options"
              className="text-black text-base font-medium font-poppins"
            >
              Payment Options
            </NavLink>
            <NavLink
              to="/returns"
              className="text-black text-base font-medium font-poppins"
            >
              Returns
            </NavLink>
            <NavLink
              to="/privacy-policies"
              className="text-black text-base font-medium font-poppins"
            >
              Privacy Policies
            </NavLink>
          </div>
        </nav>
        <div className="flex flex-col gap-6 ">
          <h2 className="text-[#9f9f9f] text-base font-medium font-poppins mb-4">
            Newsletter
          </h2>
          <form className="flex flex-col items-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="text-[#9f9f9f] text-sm font-normal font-poppins p-2 border-b-2 border-x-0 border-t-0 w-full"
            />
            <button className="w-20 py-2 text-black text-sm font-medium font-poppins border-b-2 border-black">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <div className="w-full max-w-screen-xl py-4 border-t border-[#d9d9d9] flex justify-center md:justify-start">
        <p className="text-black text-base font-normal font-poppins py-5">
          2023 furino. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;