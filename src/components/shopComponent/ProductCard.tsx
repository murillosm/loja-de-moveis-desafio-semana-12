import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../shared/types";
import { LuHeart, LuShare2, LuArrowLeftRight } from "react-icons/lu";
import { useCartContext } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div
      key={product.id}
      className="border bg-gray-100 relative"

    >
      <div className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
        <img
          src={product.images.mainImage}
          alt={product.title}
          className="w-full h-auto object-cover mb-2"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-6 p-12 z-10">
            <div className="w-full h-12 relative">
              <button
                className="w-full h-12 bg-white left-[59px] top-[12px] text-[#b88e2f] text-base font-semibold font-poppins"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
            <div className="justify-start items-center gap-5 inline-flex">
              <button className="justify-center items-center gap-0.5 flex text-white text-base font-semibold font-poppins leading-normal">
                <LuShare2 color="white" />
                Share
              </button>
              <button className="justify-center items-center gap-0.5 flex text-white text-base font-semibold font-poppins leading-normal">
                <LuArrowLeftRight color="white" />
                Compare
              </button>
              <button className="justify-center items-center gap-0.5 flex text-white text-base font-semibold font-poppins leading-normal">
                <LuHeart color="white" />
                Like
              </button>
            </div>
          </div>
        )}
      </div>
      <NavLink to={`/products/${product.id}`}>
        <div className="p-4">
          <h2 className="text-2xl text-customColor-5 font-bold mb-3 line-clamp-2 ">
            {product.title}
          </h2>
          <p className="text-customColor-3 font-poppins text-base font-medium mb-2 short-description line-clamp-3">
            {product.description.short}
          </p>
          <div className="gap-4 flex justify-between items-center font-poppins">
            <p className="font-semibold mb-3 text-xl text-customColor-5">
              R${product.salePrice.toFixed(2)}
            </p>
            <p className="text-customColor-4 line-through text-base">
              R${product.normalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </NavLink>
      <div
        className={`flex justify-center items-center w-12 h-12 absolute top-6 right-6 rounded-full text-white text-xs font-bold px-2 py-1 ${
          product.new ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {product.new
          ? "NEW"
          : `${(product.discountPercentage * 100).toFixed(0)}%`}
      </div>
    </div>
  );
};

export default ProductCard;
