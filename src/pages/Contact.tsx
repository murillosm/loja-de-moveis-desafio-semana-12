import React from "react";
import PageHeader from "../components/nav/PageHeader";
import Info from "../components/Info";
import { MdLocationOn } from "react-icons/md";
import { FaClock, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <PageHeader title={"Contact"} currentPath={"/contact"} />
      <section className="flex flex-col w-full p-24 justify-center items-center ">
        <div className="flex flex-col w-full justify-center items-center ">
          <h1 className="m-4 text-black text-4xl font-semibold font-poppins text-center">
            Get In Touch With Us
          </h1>
          <p className="max-w-[644px] text-customColor-3 text-center p-2">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div className="w-full px-0 lg:px-[237px] flex lg:flex-row flex-col justify-center lg:items-start items-center mt-20">
          <div className="max-w-[393px] p-0 lg:p-[46px]">
            <div className="flex gap-4 my-6">
              <div className="h-full">
                <MdLocationOn className="w-[35px] h-auto" />
              </div>
              <div className="py-4 pl-4 pr-6">
                <h2 className="text-black text-2xl font-medium font-poppins text-start">
                  Address
                </h2>
                <p className="text-black text-base font-normal font-poppins">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex gap-4 my-6">
              <div className="h-full">
                <FaPhoneAlt className="w-[26px] h-auto" />
              </div>
              <div className="py-4 pl-6 pr-6">
                <h2 className="text-black text-2xl font-medium font-poppins text-start">
                  Phone
                </h2>
                <p className="text-black text-base font-normal font-poppins">
                  Mobile: +(84) 546-6789
                </p>
                <p className="text-black text-base font-normal font-poppins">
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex gap-4 my-6">
              <div className="h-full">
                <FaClock className="w-[30px] h-auto" />
              </div>
              <div className="py-4 pl-4 pr-6">
                <h2 className="text-black text-2xl font-medium font-poppins text-start">
                  Working Time
                </h2>
                <p className="text-black text-base font-normal font-poppins">
                  Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-7 w-full px-0 lg:px-40 my-8 flex-col lg:justify-start justify-center">
            <div className="space-y-4 max-w-[528px]">
              <label
                htmlFor="name"
                className="block font-medium text-black text-base"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="h-[75px] mt-1 text-base font-normal font-poppins block w-full p-2 border border-customColor-3 rounded-md"
                required
              />
            </div>
            <div className="space-y-4 max-w-[528px]">
              <label
                htmlFor="email"
                className="block font-medium text-black text-base"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="h-[75px] mt-1 text-base font-normal font-poppins block w-full p-2 border border-customColor-3 rounded-md"
                required
              />
            </div>
            <div className="space-y-4 max-w-[528px]">
              <label
                htmlFor="subject"
                className="block font-medium text-black text-base"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="h-[75px] mt-1 text-base font-normal font-poppins block w-full p-2 border border-customColor-3 rounded-md"
                required
              />
            </div>
            <div className="space-y-4 max-w-[528px]">
              <label
                htmlFor="message"
                className="block font-medium text-black text-base"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 text-base font-normal font-poppins block w-full p-2 border border-customColor-3 rounded-md"
                required
              ></textarea>
            </div>
            <div className="space-y-4 max-w-[528px]">
              <button
                type="submit"
                className="w-[237px] h-[55px] py-2 px-4 bg-customColor-2 text-white font-medium rounded-md hover:bg-customColor-1"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      <Info />
    </>
  );
};

export default Contact;
