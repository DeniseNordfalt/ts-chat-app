import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  const submitElement = screen.getByText(/Register/i);
  expect(submitElement).toBeInTheDocument();
});

test("changes values on form input", () => {
  render(
    <Router>
      <UserCreatePage />
    </Router>
  );

  const usernameElement = screen.getByLabelText(/Username/i);
  userEvent.type(usernameElement, "test");

  const passwordElement = screen.getByLabelText(/Password/i);
  userEvent.type(passwordElement, "test");

  const emailElement = screen.getByLabelText(/Email/i);
  userEvent.type(emailElement, "test@test.se");

  expect(usernameElement).toHaveValue("test");
  expect(passwordElement).toHaveValue("test");
  expect(emailElement).toHaveValue("test@test.se");

  expect(usernameElement).not.toHaveValue("testuser2");
});
