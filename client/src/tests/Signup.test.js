import React from "react";
import { render, screen } from "@testing-library/react";
import Signup from "../components/Signup";

test("renders app name", () => {
  render(<Signup />);
  const linkElement = screen.getByText(/PennLobby/i);
  expect(linkElement).toBeInTheDocument();
});

test("sign up button test", () => {
  render(<Signup />);
  const signup = document.querySelector(".signup-button");
  signup.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});

// test("sign up link test", () => {
//   render(<Signup />);
//   const signup = document.querySelector(".signup-link");
//   expect(signup.textContent()).toEqual("Already have an account? Sign in");
// });