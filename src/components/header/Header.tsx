import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import vector from "../../assets/Vector.svg";
import cart from "../../assets/cart.svg";
import { HiMenu } from "react-icons/hi";
import CartModal from "../CartModal";
import { auth } from "../../services/firebaseConfig";
import { signOut } from "firebase/auth";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const linkStyle = "text-black text-base font-medium font-poppins";

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleVectorClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <header className="w-full min-h-[100px] px-4 md:px-14 py-4 flex  items-center">
      <div className="w-full md:py-0 py-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center justify-center gap-[5px]">
            <img src={logo} alt="Logo" className="w-[50px] h-8" />
            <div className="text-black text-[24px] md:text-[34px] font-bold font-montserrat">
              Furniro
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <img src={vector} alt="Vector Icon" className="w-6 h-7 mx-2" />
            <img src={cart} alt="Cart Icon" className="w-7 h-7 mx-2" />
            <button
              className="block text-black ml-5"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Toggle Menu"
            >
              <HiMenu size={24} />
            </button>
          </div>
        </div>
        <div
          className={`w-full md:w-auto p-2 lg:flex ${
            menuOpen ? "block" : "hidden"
          } lg:order-2 order-1`}
        >
          <nav className="justify-center items-center flex flex-col lg:flex-row text-center gap-4 lg:gap-[74.5px] ">
            <NavLink to="/" className={linkStyle} end>
              <p>Home</p>
            </NavLink>
            <NavLink to="/shop" className={linkStyle}>
              <p>Shop</p>
            </NavLink>
            <NavLink to="/" className={linkStyle}>
              <p>About</p>
            </NavLink>
            <NavLink to="/contact" className={linkStyle}>
              <p>Contact</p>
            </NavLink>
          </nav>
        </div>
        <div className="hidden lg:flex p-4 gap-4 lg:order-3 order-3">
          <button onClick={handleVectorClick}>
            <img
              src={vector}
              alt="Vector Icon"
              className="w-6 h-7 relative mx-2"
            />
          </button>
          <button onClick={toggleCartModal}>
            <img src={cart} alt="Cart Icon" className="w-7 h-7 relative " />
          </button>
        </div>
      </div>
      {isCartModalOpen && <CartModal toggleCartModal={toggleCartModal} />}
      {isPopupOpen && (
        <div className="absolute w-40 top-16 right-24 bg-white shadow-lg rounded-lg p-4 z-10">
          <button
            className="w-full h-12 bg-customColor-2 rounded-lg text-customColor-5 font-normal text-lg flex items-center justify-center gap-4 hover:opacity-80 mb-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="w-full h-12 bg-red-500 rounded-lg text-white font-normal text-lg flex items-center justify-center gap-4 hover:opacity-80"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;