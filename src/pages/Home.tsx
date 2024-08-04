import React, { useContext, useEffect, useState } from "react";
import bg from "../assets/scandinavian-interior-mockup-wall-decal-background 1.png";
import collage from "../assets/collage.png";
import ProductGrid from "../components/shopComponent/ProductGrid";
import { Product } from "../shared/types";
import api from "../data/api";
import { NavLink } from "react-router-dom";
import dining from "../assets/image 106.png";
import living from "../assets/image 100.png";
import bedroom from "../assets/image 101.png";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { products, setProducts, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-10">
        <i
          data-testid="loading-spinner"
          className="fa-duotone fa-solid fa-spinner fa-spin-pulse fa-2xl flex justify-center items-center"
          style={
            {
              "--fa-primary-color": "#b88e2f",
              "--fa-secondary-color": "#b88e2f",
            } as React.CSSProperties
          }
        ></i>
      </div>
    );
  }

  return (
    <div>
      <section className="w-full min-h-[717px] flex items-center justify-end relative gap-4">
        <img
          className="w-full h-full object-cover object-center absolute"
          src={bg}
        />
        <div className="flex flex-col absolute bg-[#fff2e3] rounded-[10px] p-4 md:p-[41px] me-0 md:me-20">
          <div className="text-[#333333] text-base font-semibold font-poppins tracking-[3px]">
            New Arrival
          </div>
          <h1 className="w-full md:w-[559px] h-auto md:h-[127px] text-customColor-2 text-2xl md:text-[52px] font-bold font-poppins leading-tight md:leading-[65px] mt-2 md:mt-0">
            Discover Our New Collection
          </h1>
          <p className="w-full md:w-[546px] h-auto md:h-[52px] text-[#333333] text-sm md:text-lg font-medium font-poppins mt-2 md:mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="mt-4 w-full md:w-56 h-12 md:h-[74px] px-4 md:px-[72px] py-2 md:py-[25px] text-white text-base font-bold font-poppins bg-customColor-2 flex justify-center items-center">
            BUY Now
          </button>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center relative py-8 px-24 gap-8">
        <div className="w-full relative">
          <h1 className="text-[#333333] text-[32px] font-bold font-poppins flex items-center justify-center">
            Browse The Range
          </h1>
          <p className="text-center text-[#666666] text-xl font-normal font-poppins flex items-center justify-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col text-center gap-4">
            <img src={dining} alt="" className="w-[381px] h-[480px]" />
            <p className="text-center text-[#333333] text-2xl font-semibold font-poppins">
              Dining
            </p>
          </div>
          <div className="flex flex-col text-center gap-4">
            <img src={living} alt="" className="w-[381px] h-[480px]" />
            <p className="text-center text-[#333333] text-2xl font-semibold font-poppins">
              Living
            </p>
          </div>
          <div className="flex flex-col text-center gap-4">
            <img src={bedroom} alt="" className="w-[381px] h-[480px]" />
            <p className="text-center text-[#333333] text-2xl font-semibold font-poppins">
              Bedroom
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center container mx-auto p-4 ">
        <h1 className="text-center text-[#3a3a3a] text-[40px] font-medium font-poppins leading-[48px]">
          Our Products
        </h1>
        <ProductGrid products={products.slice(0, 8)} />
        <button className="w-[245px] h-12 bg-white border border-customColor-2 text-customColor-2 text-base font-semibold font-poppins">
          <NavLink to="/shop">Show More</NavLink>
        </button>
      </section>

      <section className="w-full min-h-[670px] flex items justify-center gap-4 relative py-11 ">
        <img className="w-full object-cover object-center my-4" src={collage} />
        <div className="flex flex-col absolute">
          <div className="w-[356px] h-[86px] relative">
            <div className="flex justify-center text-center text-[#606060] text-xl font-semibold font-poppins leading-[30px]">
              Share your setup with
            </div>
            <div className="flex justify-center text-center text-[#3a3a3a] text-[40px] font-bold font-poppins leading-[48px]">
              #FuniroFurniture
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
