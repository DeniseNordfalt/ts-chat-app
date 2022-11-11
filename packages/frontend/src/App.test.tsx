import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserCreatePage from "./pages/UserCreatePage";

test("renders user create page", () => {
  render(
    <Router>
      <UserCreatePage />
    </Router>
  );

  const usernameElement = screen.getByLabelText(/Username/i);
  expect(usernameElement).toBeInTheDocument();

  const passwordElement = screen.getByLabelText(/Password/i);
  expect(passwordElement).toBeInTheDocument();

  const emailElement = screen.getByLabelText(/Email/i);
  expect(emailElement).toBeInTheDocument();

  const submitButtonElement = screen.getByRole("button", { name: /Register/i });
  expect(submitButtonElement).toBeInTheDocument();
});
