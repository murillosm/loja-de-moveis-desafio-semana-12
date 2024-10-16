import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  return (
    <div className="w-[123px] h-16 rounded-xl flex items-center justify-between space-x-2 border font-poppins border-[#9f9f9f]">
      <button
        className="px-2 py-1"
        onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="px-2 py-1"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;