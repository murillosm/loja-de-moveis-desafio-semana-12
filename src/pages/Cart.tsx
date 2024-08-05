import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import PageHeader from "../components/nav/PageHeader";
import Info from "../components/Info";
import QuantitySelector from "../components/QuantitySelector";
import deleteIcon from "../assets/ant-design_delete-filled.svg";
import { useCartContext } from "../context/CartContext";
import { auth } from "../services/firebaseConfig";

const Cart = () => {
  const { cart, removeFromCart } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <PageHeader title={"Cart"} currentPath={"/cart"} />
      <section className="w-full px-4 md:px-[100px] py-8 md:py-[72px] flex justify-center flex-col xl:flex-row gap-6">
        <div className="overflow-x-auto w-full">
          <table className="w-full divide-y font-poppins">
            <thead className="bg-customColor-1">
              <tr className="h-[55px]">
                <th className="px-6 py-3 text-center text-base font-medium text-black md:text-sm sm:text-xs">
                  Product
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-black md:text-sm sm:text-xs">
                  Price
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-black md:text-sm sm:text-xs">
                  Quantity
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-black md:text-sm sm:text-xs">
                  Subtotal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-customColor-1">
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="text-base font-poppins md:text-sm sm:text-xs"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-4">
                      <img
                        className="w-[105px] h-[105px] rounded-md object-cover"
                        src={item.images.mainImage}
                        alt={item.title}
                      />
                      <p>{item.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    R${item.salePrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center">
                      <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    R${(item.salePrice * item.quantity).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap text-center">
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="min-w-[393px] h-[390px] relative bg-[#f9f1e7] flex flex-col items-center justify-between pb-24 mt-8 md:mt-0">
          <h2 className="text-black text-[32px] font-semibold font-poppins py-4 md:text-[28px] sm:text-[24px]">
            Cart Totals
          </h2>
          <div className="flex flex-col items-start w-full px-8">
            <div className="flex justify-between w-full py-4">
              <span className="text-black text-base font-medium font-poppins md:text-sm sm:text-xs">
                Subtotal
              </span>
              <span className="text-[#9f9f9f] text-base font-normal font-poppins md:text-sm sm:text-xs">
                R$
                {cart
                  .reduce(
                    (acc, item) => acc + item.salePrice * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between w-full py-4">
              <span className="text-black text-base font-medium font-poppins md:text-sm sm:text-xs">
                Total
              </span>
              <span className="text-[#b88e2f] text-xl font-medium font-poppins md:text-lg sm:text-base">
                R$
                {cart
                  .reduce(
                    (acc, item) => acc + item.salePrice * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <button
            className="w-[222px] h-[58.95px] mt-8 flex items-center justify-center rounded-[15px] border border-black text-black text-xl font-normal font-poppins md:text-lg sm:text-base"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      </section>
      <Info />
    </>
  );
};

export default Cart;
