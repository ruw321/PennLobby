import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login";

test("renders app name", () => {
  render(<Login />);
  const linkElement = screen.getByText(/PennLobby/i);
  expect(linkElement).toBeInTheDocument();
});

test("login button test", () => {
  render(<Login />);
  const signup = document.querySelector(".login-button");
  signup.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});