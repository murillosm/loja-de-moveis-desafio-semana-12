import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { describe, it, expect } from "vitest";
import ProductGrid from "./ProductGrid";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import { AppProvider } from "../../context/AppContext";

// Mock dos produtos para os testes
const mockProducts = [
  {
    id: 1,
    sku: "12345",
    title: "Produto 1",
    category: "Categoria 1",
    tags: ["tag1", "tag2"],
    normalPrice: 100.0,
    salePrice: 80.0,
    discountPercentage: 0.2,
    new: true,
    description: {
      short: "Descrição curta 1",
      long: "Descrição longa 1",
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
  },
  {
    id: 2,
    sku: "67890",
    title: "Produto 2",
    category: "Categoria 2",
    tags: ["tag3", "tag4"],
    normalPrice: 200.0,
    salePrice: 160.0,
    discountPercentage: 0.2,
    new: false,
    description: {
      short: "Descrição curta 2",
      long: "Descrição longa 2",
    },
    colors: [
      { name: "Blue", hex: "#0000ff" },
      { name: "Yellow", hex: "#ffff00" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.0,
    images: {
      mainImage: "https://via.placeholder.com/150",
      gallery: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
  },
];

describe("ProductGrid component", () => {
  it("should render the correct number of products", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <ProductGrid products={mockProducts} />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    const productCards = screen.getAllByRole("link");
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it("should render product titles", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <ProductGrid products={mockProducts} />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it("should render product prices", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <ProductGrid products={mockProducts} />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    mockProducts.forEach((product) => {
      expect(
        screen.getByText(`R$${product.salePrice.toFixed(2)}`)
      ).toBeInTheDocument();
    });
  });
});