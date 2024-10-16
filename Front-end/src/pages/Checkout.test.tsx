import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import { CartProvider } from "../context/CartContext";
import Checkout from "./Checkout";
import { describe, expect, it, vi } from "vitest";

// Mock do CartContext
vi.mock("../context/CartContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    CartProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useCartContext: () => ({
      cart: [
        { title: "Product 1", quantity: 2, salePrice: 10 },
        { title: "Product 2", quantity: 1, salePrice: 20 },
      ],
    }),
  };
});

describe("Checkout component", () => {
  it("should render the checkout form", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <Checkout />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("Billing details")).toBeInTheDocument();
  });

  it("should show validation errors on submit with empty fields", async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <Checkout />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Place order"));

    expect(await screen.findByText("First name is required")).toBeInTheDocument();
    expect(await screen.findByText("Last name is required")).toBeInTheDocument();
  });

  it("should submit the form with valid data", async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <Checkout />
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "12345" } });
    fireEvent.change(screen.getByLabelText("Country / Region"), { target: { value: "USA" } });
    fireEvent.change(screen.getByLabelText("Street address"), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText("Town / City"), { target: { value: "Anytown" } });
    fireEvent.change(screen.getByLabelText("Province"), { target: { value: "CA" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "john.doe@example.com" } });

    fireEvent.click(screen.getByText("Place order"));

    expect(await screen.findByText((content, element) => content.includes("Your personal data will be used"))).toBeInTheDocument();
  });
});