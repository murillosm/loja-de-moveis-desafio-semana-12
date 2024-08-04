import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../data/api";
import { Product } from "../shared/types";
import RatingStars from "../components/StarRating";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import ProductGrid from "../components/shopComponent/ProductGrid";
import QuantitySelector from "../components/QuantitySelector";
import { useCartContext } from "../context/CartContext";

const SingleProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.images.mainImage);
        setSelectedSize(response.data.sizes[0]);
        setSelectedColor(response.data.colors[0].name);
        fetchRelatedProducts(response.data.category);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category: string) => {
      try {
        const response = await api.get(`/products?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos relacionados:", error);
      }
    };

    fetchProduct();
  }, [productId, setProduct, setProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisibleProductsCount(4);
  }, [productId]);

  if (loading) {
    return (
      <div className="w-full min-h-10">
        <i
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

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleShowMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 4);
  };
  return (
    <div className="w-full">
      <div className="w-full min-h-[100px] bg-customColor-1 flex flex-wrap items-center px-4 py-3 lg:px-32 justify-start gap-4">
        <div className="flex items-center justify-center gap-4">
          <NavLink
            to="/"
            className="text-customColor-3 text-base font-normal font-poppins p-1"
          >
            Home
          </NavLink>
          <MdKeyboardArrowRight size={24} />
          <NavLink
            to="/shop"
            className="text-customColor-3 text-base font-normal font-poppins p-1"
          >
            Shop
          </NavLink>
          <MdKeyboardArrowRight size={24} />
        </div>
        <div className="h-[37px] w-[3px] bg-customColor-1 sm:bg-[#9F9F9F] mx-[15px]"></div>
        <div className="font-poppins font-medium">{product.title}</div>
      </div>

      <section className="container mx-auto py-24 px-2 lg:px-24 flex gap-[82px] flex-col xl:flex-row">
        <div className="flex gap-8 w-full xl:w-1/2 flex-col-reverse md:flex-row">
          <div className="flex flex-row md:flex-col gap-1 sm:gap-8 items-center min-w-20">
            {product.images.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 sm:w-14 sm:h-14 md:w-20 md:h-20 object-cover cursor-pointer rounded-xl bg-customColor-1 border-customColor-1 border"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="flex justify-center max-h-[500px] rounded-xl bg-customColor-1 border-customColor-1 border">
            <img
              src={selectedImage ?? ""}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="w-full xl:w-1/2 py-2">
          <h1 className="text-black text-[32px] md:text-[42px] font-normal font-poppins">
            {product.title}
          </h1>
          <div className="gap-4 flex justify-start items-center font-poppins">
            <p className="text-[#9f9f9f] text-xl md:text-2xl font-medium mb-3">
              R${product.salePrice.toFixed(2)}
            </p>
            <p className="text-customColor-4 line-through text-base">
              R${product.normalPrice.toFixed(2)}
            </p>
          </div>
          <RatingStars rating={product.rating} />
          <p className="text-black my-4 text-[13px] md:text-[15px] font-normal font-poppins">
            {product.description.short}
          </p>
          <div className="mb-4">
            <h2 className="mb-2 text-[#9f9f9f] text-sm font-normal font-poppins">
              Size
            </h2>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`w-[30px] h-[30px] font-poppins rounded-[5px] ${
                    selectedSize === size
                      ? "bg-customColor-2 text-white"
                      : "bg-customColor-1 text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-[#9f9f9f] text-sm font-normal font-poppins">
              Color
            </h2>
            <div className="flex gap-4 my-4">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color.name ? "border-black" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.name)}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-[18px]">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <button
              className="w-[215px] h-16 rounded-[15px] border border-black text-black text-xl font-normal font-poppins"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          <div className="w-full h-[0px] border border-[#d9d9d9] my-[30px] md:my-[60px] mx-1" />
          <div className="px-4 w-full flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-3">
              <div className="text-[#9f9f9f] text-base font-normal font-poppins">
                SKU
              </div>
              <div className="text-[#9f9f9f] text-base font-normal font-poppins">
                Category
              </div>
              <div className="text-[#9f9f9f] text-base font-normal font-poppins">
                Tags
              </div>
              <div className="text-[#9f9f9f] text-base font-normal font-poppins">
                Share
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[#9f9f9f] text-base font-normal font-poppins flex gap-3">
                <p>:</p> {product.sku}
              </div>
              <div className="text-[#9f9f9f] text-base font-normal font-poppins flex gap-3">
                <p>:</p> {product.category}
              </div>
              <div className="text-[#9f9f9f] text-base font-normal font-poppins flex gap-3">
                <p>:</p> {product.tags.join(", ")}
              </div>
              <div className="text-[#9f9f9f] text-base font-normal font-poppins flex gap-3">
                <p>:</p>
                <div className="flex gap-[23px]">
                  <a
                    href="https://pt-br.facebook.com/login/device-based/regular/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={20} color="black" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={20} color="black" />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillTwitterCircle size={20} color="black" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto p-6 md:p-12 lg:p-24">
        <div className="w-full h-9 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-36">
          <div className="text-black text-xl md:text-2xl font-medium font-poppins">
            Description
          </div>
          <div className="text-[#9f9f9f] text-xl md:text-2xl font-normal font-poppins">
            Additional Information
          </div>
        </div>
        <p className="my-4 text-sm md:text-base font-normal font-poppins px-4 md:px-12 lg:px-36 text-[#9f9f9f] mt-8">
          {product.description.long}
        </p>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-8">
          <img
            src={product.images.mainImage}
            alt={product.title}
            className="w-full md:w-1/2 h-48 md:h-[348px] rounded-xl bg-customColor-1 object-cover"
          />
          <img
            src={product.images.gallery[0]}
            alt={`${product.title} - Extra`}
            className="w-full md:w-1/2 h-48 md:h-[348px] rounded-xl bg-customColor-1 object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center container mx-auto p-4 ">
        <h1 className="text-center text-[#3a3a3a] text-[40px] font-medium font-poppins leading-[48px]">
          Related Products
        </h1>
        <ProductGrid products={products.slice(0, visibleProductsCount)} />
        <button
          className="w-[245px] h-12 bg-white border border-customColor-2 text-customColor-2 text-base font-semibold font-poppins"
          onClick={handleShowMore}
        >
          Show More
        </button>
      </section>
    </div>
  );
};

export default SingleProduct;
