import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartModal from "./CartModal";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { AppProvider } from "../context/AppContext";
import { CartProvider, useCartContext } from "../context/CartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

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

// Mock do estado de autenticação
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi.fn(),
}));

describe("CartModal component", () => {
  const toggleCartModal = vi.fn();

  beforeEach(() => {
    (useAuthState as vi.Mock).mockReturnValue([true, false, false]);
  });

  it("should add item to cart", () => {
    const TestComponent = () => {
      const { addToCart } = useCartContext();
      React.useEffect(() => {
        addToCart(mockProduct, 1, "M", "Red");
      }, []);
      return null;
    };

    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <CartModal toggleCartModal={toggleCartModal} />
            <TestComponent />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it("should navigate to checkout on checkout button click", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <CartModal toggleCartModal={toggleCartModal} />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    const checkoutButton = screen.getByText("Checkout");
    fireEvent.click(checkoutButton);

    expect(window.location.pathname).toBe("/checkout");
  });

  it("should remove item from cart on remove button click", () => {
    const TestComponent = () => {
      const { addToCart } = useCartContext();
      React.useEffect(() => {
        addToCart(mockProduct, 1, "M", "Red");
      }, []);
      return null;
    };
  
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <CartModal toggleCartModal={toggleCartModal} />
            <TestComponent />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );
  
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  
    const removeButton = screen.getAllByRole("button").find((button) =>
      button.querySelector("svg")
    );
    if (removeButton) {
      fireEvent.click(removeButton);
    }

    setTimeout(() => {
      expect(screen.queryByText(mockProduct.title)).not.toBeInTheDocument();
    }, 0);
  });
});