import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserCreatePage from "./pages/UserCreatePage";
import axios from "axios";
import Layout from "./components/Layout";

import UserLoginPage from "./pages/UserLoginPage";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

function App() {
  return (
    <>
      <ChakraProvider>
        <Layout>
          <Routes>
            <Route path="/" />
            <Route path="/register" element={<UserCreatePage />} />
            <Route path="/login" element={<UserLoginPage />} />

            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default App;
