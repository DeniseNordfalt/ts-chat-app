import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  const token = localStorage.getItem("jwt_token");

  return (
    <Flex
      direction="column"
      height="100vh"
      width="100vw"
      bg={"teal.100"}
      maxW={{ base: "100%", md: "80%", lg: "60%" }}
      margin="auto"
    >
      <Box as="header" flex="0 0 auto" bgColor="teal.500" color="white" p={4}>
        <Heading as="h1" size="lg" paddingStart={3}>
          <Link href="/">Chat App</Link>
        </Heading>
      </Box>
      <Box as="nav" padding={2} bgColor="teal.300" flex="0 0 auto">
        <Link href="/" padding={1}>
          Home
        </Link>
        <Link href="/login" padding={1}>
          Login
        </Link>
        <Link href="/register" padding={1}>
          Register
        </Link>
        {token && (
          <Link onClick={handleLogout} padding={1}>
            Logout
          </Link>
        )}
      </Box>

      <Box as="main" flex="1 1 auto" margin="0 auto" minW="80%">
        {children}
      </Box>
      <Box as="footer" flex="0 0 auto"></Box>
    </Flex>
  );
}
