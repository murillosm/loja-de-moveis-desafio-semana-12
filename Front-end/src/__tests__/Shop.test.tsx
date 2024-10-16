import React from "react";
import { render, screen } from "@testing-library/react";
import Shop from "../pages/Shop";
import { expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext";


test("renders loading spinner when loading is true", () => {
  render(
    <BrowserRouter>
      <AppProvider>
        <Shop loading={true} />
      </AppProvider>
    </BrowserRouter>
  );
  const spinnerElement = screen.getByTestId("loading-spinner");
  expect(spinnerElement).toBeInTheDocument();
});
