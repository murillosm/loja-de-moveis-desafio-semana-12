import React from 'react';
import { useCartContext } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';


type CartModalProps = {
  toggleCartModal: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ toggleCartModal }) => {
  const { cart, removeFromCart } = useCartContext();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleCartModal();
    }
  };

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className="inset-0 bg-black bg-opacity-50 flex justify-end items-start fixed z-10"
      data-testid="cart-modal-background"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg max-w-[417px] h-auto p-7">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-semibold font-poppins">Shopping Cart</h1>
          <button onClick={toggleCartModal}>
            <svg
              className="w-5 h-5 text-customColor-3"
              fill="currentColor"
              height="1em"
              stroke="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z" />
            </svg>
          </button>
        </div>
        <div className="h-[2px] my-7 bg-[#d9d9d9]" />
        <div className="flex pt-8 justify-between">
          <div className="text-black text-base font-normal font-poppins">total</div>
          <div className="text-[#b88e2f] text-base font-semibold font-poppins">R$ 0.00</div>
        </div>
        <div className="h-[2px] my-7 bg-[#d9d9d9]" />
        <div className="flex justify-between">
          <button className="text-center text-black text-xs font-normal font-poppins py-1.5 px-7 rounded-[50px] border border-black">
            <a href="/cart">Cart</a>
          </button>
          <button
            className="text-center text-black text-xs font-normal font-poppins py-1.5 px-7 rounded-[50px] border border-black"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <div className="text-center text-black text-xs font-normal font-poppins py-1.5 px-7 rounded-[50px] border border-black">
            Comparison
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;