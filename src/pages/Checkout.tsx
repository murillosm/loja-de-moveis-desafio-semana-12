import React from "react";
import PageHeader from "../components/nav/PageHeader";
import Info from "../components/Info";

const Checkout = () => {
  return (
    <>
      <PageHeader title={"Checkout"} currentPath={"/checkout"} />
      <div className="px-[100px] py-16 flex">
        <form className="w-1/2 px-4 md:px-[100px] py-8 md:py-[72px] flex justify-center flex-col gap-6">
          <h1 className="font-poppins font-semibold text-4xl">
            Billing details
          </h1>
          <div className="flex gap-6">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="companyName">Company Name (Optional)</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="zipCode">ZIP code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="country">Country / Region</label>
            <input
              type="text"
              id="country"
              name="country"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="streetAddress">Street address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="city">Town / City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="addonAddress">Add-on address</label>
            <input
              type="text"
              id="addonAddress"
              name="addonAddress"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="additionalInfo">Additional information</label>
            <input
              type="text"
              id="additionalInfo"
              name="additionalInfo"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>

        <div className="w-1/2 h-[789px] bg-white p-4 flex flex-col">
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="text-black text-2xl font-medium font-['Poppins'] flex justify-between">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-black text-base font-normal font-['Poppins']">
                  Asgaard sofa
                </div>
                <div className="text-black text-base font-light font-['Poppins']">
                  Rs. 250,000.00
                </div>
              </div>

              <div className="flex justify-between items-center mt-1">
                <div className="text-black text-xs font-medium font-['Poppins']">
                  X 1
                </div>
                <div className="text-black text-base font-light font-['Poppins']">
                  Rs. 250,000.00
                </div>
              </div>

              <div className="mt-6 text-[#b88e2f] text-2xl font-bold font-['Poppins'] text-right">
                Rs. 250,000.00
              </div>

              <div className="mt-4 text-black text-base font-normal font-['Poppins'] flex justify-between">
                <span>Subtotal</span>
                <span>Rs. 250,000.00</span>
              </div>

              <div className="text-black text-base font-normal font-['Poppins'] flex justify-between">
                <span>Total</span>
                <span>Rs. 250,000.00</span>
              </div>

              <div className="my-6 border-t border-[#d9d9d9]"></div>

              <div className="text-black text-base font-light font-['Poppins'] text-justify">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our
                <span className="font-semibold"> privacy policy.</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <div className="w-3.5 h-3.5 bg-black rounded-full mr-2"></div>
                <div className="text-black text-base font-normal font-['Poppins']">
                  Direct Bank Transfer
                </div>
              </div>

              <div className="text-[#9f9f9f] text-base font-light font-['Poppins'] text-justify">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </div>

              <div className="mt-6 flex items-center mb-2">
                <div className="w-3.5 h-3.5 rounded-full border border-[#9f9f9f] mr-2"></div>
                <div className="text-[#9f9f9f] text-base font-medium font-['Poppins']">
                  Direct Bank Transfer
                </div>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-3.5 h-3.5 rounded-full border border-[#9f9f9f] mr-2"></div>
                <div className="text-[#9f9f9f] text-base font-medium font-['Poppins']">
                  Cash On Delivery
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full flex justify-center">
            <button className="w-[318px] h-16 rounded-[15px] border border-black flex items-center justify-center">
              <span className="text-black text-xl font-normal font-['Poppins']">
                Place order
              </span>
            </button>
          </div>
        </div>
      </div>
      <Info />
    </>
  );
};

export default Checkout;
