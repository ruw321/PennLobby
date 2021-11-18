import React from "react";
import { render, screen } from "@testing-library/react";
import Signup from "../components/Signup";

test("renders app name", () => {
  render(<Signup />);
  const linkElement = screen.getByText(/PennLobby/i);
  expect(linkElement).toBeInTheDocument();
});
