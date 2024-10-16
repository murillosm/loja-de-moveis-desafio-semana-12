import React from "react";
import highQuality from "../assets/HighQuality.svg";
import warrantyProtection from "../assets/WarrantyProtection.svg";
import freeShipping from "../assets/FreeShipping.svg";
import support from "../assets/Support.svg";

const Info = () => {
  const infoItems = [
    {
      title: "High Quality",
      description: "crafted from top materials",
      image: highQuality,
    },
    {
      title: "Warranty Protection",
      description: "Over 2 years",
      image: warrantyProtection,
    },
    {
      title: "Free Shipping",
      description: "Order over 150 $",
      image: freeShipping,
    },
    {
      title: "24 / 7 Support",
      description: "Dedicated support",
      image: support,
    },
  ];

  return (
    <div className="w-full min-h-[270px] py-10 bg-[#faf3ea] flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-xl flex flex-wrap justify-around items-center gap-6">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2.5 md:flex-row">
            <img src={item.image} alt={item.title} className="w-[60px] h-[60px]" />
            <div className="flex flex-col items-center md:items-start">
              <div className="text-[#242424] text-[25px] font-semibold font-poppins leading-[37.50px]">
                {item.title}
              </div>
              <div className="text-[#898989] text-xl font-medium font-poppins leading-[30px]">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;