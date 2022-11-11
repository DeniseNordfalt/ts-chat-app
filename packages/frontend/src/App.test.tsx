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
  const headerElement = screen.getByText(/Create User/i);
  expect(headerElement).toBeInTheDocument();
});
