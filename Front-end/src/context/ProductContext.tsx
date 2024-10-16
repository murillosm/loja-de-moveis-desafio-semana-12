import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../data/api';
import { Product } from '../shared/types';
import React, { useEffect, useState } from "react";
import api from "../data/api";
import { Product } from "../shared/types";
import RatingStars from "../components/StarRating";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import ProductGrid from "../components/shopComponent/ProductGrid";

interface ProductContextType {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  currentPage: number;
  itemsPerPage: number;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.images.mainImage);
        setSelectedSize(response.data.sizes[0]);
        setSelectedColor(response.data.colors[0].name);
        fetchRelatedProducts(response.data.category);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
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
  }, [productId]);

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      selectedCategory,
      currentPage,
      itemsPerPage,
      setSelectedCategory,
      setCurrentPage
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};