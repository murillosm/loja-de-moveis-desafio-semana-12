import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

type CartModalProps = {
  toggleCartModal: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ toggleCartModal }) => {
  const { cart, removeFromCart } = useCartContext();

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleCartModal();
    }
  };

  return (
    <div
      className="inset-0 bg-black bg-opacity-50 flex justify-end items-start fixed z-10"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg max-w-[417px] h-auto p-7">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-semibold font-['Poppins']">
            Shopping Cart
          </h1>
          <button onClick={toggleCartModal}>
            <IoCloseCircle className="w-5 h-5 text-customColor-3" />
          </button>
        </div>
        <div className="h-[2px] my-7 bg-[#d9d9d9]"></div>
        {cart.map((item) => (
          <div>
            <div className="w-full h-auto flex items-center">
              <div className="w-[108px] h-[105px] flex-shrink-0 flex items-center justify-center relative">
                <img
                  className="w-[111px] h-[90px] object-cover rounded-md"
                  src={item.images.mainImage}
                  alt={item.title}
                />
              </div>
              <div className="ml-4 flex flex-col justify-center">
                <div className="text-black text-base font-normal font-['Poppins']">
                  {item.title}
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-black text-base font-light font-['Poppins']">
                    {item.quantity}
                  </div>
                  <div className="mx-2 text-black text-xs font-light font-['Poppins']">
                    X
                  </div>
                  <div className="text-[#b88e2f] text-xs font-medium font-['Poppins']">
                    R${(item.salePrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)}>
                <IoCloseCircle className="w-5 h-5 text-customColor-3" />
              </button>
            </div>
            <div className="h-[2px] my-7 bg-[#d9d9d9]"></div>
          </div>
        ))}
        <div className="flex pt-8 justify-between">
          <div className="text-black text-base font-normal font-poppins">
            total
          </div>
          <div className="text-[#b88e2f] text-base font-semibold font-poppins">
            R$
            {cart
              .reduce((acc, item) => acc + item.salePrice * item.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
        <div className="h-[2px] my-7 bg-[#d9d9d9]"></div>
        <div className="flex justify-between">
          <button
            className="text-center text-black text-xs font-normal font-poppins py-1.5 px-7 rounded-[50px] border border-black"
            onClick={toggleCartModal}
          >
            <NavLink to="/cart">Cart</NavLink>
          </button>
          <div className="text-center text-black text-xs font-normal font-poppins py-1.5 px-7 rounded-[50px] border border-black">
            Checkout
          </div>
          <div className="text-center text-black text-xs font-normal font-poppins py-1.5 px-7 rounded-[50px] border border-black">
            Comparison
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
