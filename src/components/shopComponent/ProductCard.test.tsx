import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "./ProductCard";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import React from "react";
import { AppProvider } from "../../context/AppContext";
import { CartProvider } from "../../context/CartContext";

// Mock do produto para os testes
const mockProduct = {
  id: 1,
  sku: "12345",
  title: "Produto de Teste",
  category: "Categoria Teste",
  tags: ["tag1", "tag2"],
  normalPrice: 100.0,
  salePrice: 80.0,
  discountPercentage: 0.2,
  new: true,
  description: {
    short: "Descrição curta",
    long: "Descrição longa",
  },
  colors: [
    { name: "Red", hex: "#ff0000" },
    { name: "Green", hex: "#00ff00" },
  ],
  sizes: ["S", "M", "L"],
  rating: 4.5,
  images: {
    mainImage: "https://via.placeholder.com/150",
    gallery: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
};

describe("ProductCard component", () => {
  it("should render product title and price", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <ProductCard product={mockProduct} />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`R$${mockProduct.salePrice.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it('should show "NEW" badge if the product is new', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <ProductCard product={mockProduct} />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("should navigate to product page on card click", () => {
    render(
      <AppProvider>
        <CartProvider>
          <BrowserRouter>
            <ProductCard product={mockProduct} />
          </BrowserRouter>
        </CartProvider>
      </AppProvider>
    );

    const card = screen.getByRole("link", { name: /Produto de Teste/i });
    fireEvent.click(card);

    expect(window.location.pathname).toBe(`/products/${mockProduct.id}`);
  });

  it("should show hover options when mouse enters the card", () => {
    render(
      <AppProvider>
        <CartProvider>
          <BrowserRouter>
            <ProductCard product={mockProduct} />
          </BrowserRouter>
        </CartProvider>
      </AppProvider>
    );

    const card = screen.getByRole("img", { name: mockProduct.title });
    fireEvent.mouseEnter(card);

    expect(screen.getByText("Add to cart")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Compare")).toBeInTheDocument();
    expect(screen.getByText("Like")).toBeInTheDocument();
  });
});