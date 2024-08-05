import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { describe, it, expect } from "vitest";
import RatingStars from "./StarRating";

describe("RatingStars component", () => {
  it("should render the correct number of full stars", () => {
    render(<RatingStars rating={3} />);
    const fullStars = screen.getAllByLabelText("full star");
    expect(fullStars).toHaveLength(3);
  });

  it("should render the correct number of full and half stars", () => {
    render(<RatingStars rating={3.5} />);
    const fullStars = screen.getAllByLabelText("full star");
    const halfStars = screen.getAllByLabelText("half star");
    expect(fullStars).toHaveLength(3);
    expect(halfStars).toHaveLength(1);
  });

  it("should render the correct number of empty stars", () => {
    render(<RatingStars rating={3} />);
    const emptyStars = screen.getAllByLabelText("empty star");
    expect(emptyStars).toHaveLength(2);
  });

  it("should render no stars for a rating of 0", () => {
    render(<RatingStars rating={0} />);
    const fullStars = screen.queryAllByLabelText("full star");
    const halfStars = screen.queryAllByLabelText("half star");
    const emptyStars = screen.getAllByLabelText("empty star");
    expect(fullStars).toHaveLength(0);
    expect(halfStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(5);
  });
});