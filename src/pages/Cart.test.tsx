import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "./Cart";
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

describe("Cart component", () => {
  beforeEach(() => {
    (useAuthState as vi.Mock).mockReturnValue([{ uid: "test-user" }, false, undefined]);
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
            <Cart />
            <TestComponent />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it("should remove item from cart on remove button click", async () => {
    const TestComponent = () => {
      const { addToCart, removeFromCart } = useCartContext();
      React.useEffect(() => {
        addToCart(mockProduct, 1, "M", "Red");
      }, []);
      return (
        <img
          src="deleteIcon"
          alt="Delete"
          onClick={() => removeFromCart(mockProduct.id)}
          className="cursor-pointer"
        />
      );
    };

    await act(async () => {
      render(
        <BrowserRouter>
          <AppProvider>
            <CartProvider>
              <Cart />
              <TestComponent />
            </CartProvider>
          </AppProvider>
        </BrowserRouter>
      );
    });

    const removeButtons = screen.getAllByAltText("Delete");
    const removeButton = removeButtons[1];
    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(screen.queryByText(mockProduct.title)).not.toBeInTheDocument();
  });


  it("should navigate to checkout on checkout button click", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppProvider>
            <CartProvider>
              <Cart />
            </CartProvider>
          </AppProvider>
        </BrowserRouter>
      );
    });

    const checkoutButton = screen.getByText("Check Out");
    await act(async () => {
      fireEvent.click(checkoutButton);
    });

    expect(window.location.pathname).toBe("/checkout");
  });
});