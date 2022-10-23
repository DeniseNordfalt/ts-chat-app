import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

// type Props = {
//   children?: React.ReactNode;
// };

// export default function Layout({ children }: Props) {

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <Flex direction="column" height="100vh" bgColor="grey">
      <Box as="header" flex="0 0 auto">
        <Heading as="h1" size="lg">
          Header
        </Heading>
      </Box>
      <Box as="nav">
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/logout">Logout</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/chat">Chat</Link>
      </Box>

      <Box as="main" flex="1 1 auto" bgColor="white">
        {children}
      </Box>
      <Box as="footer" flex="0 0 auto">
        Footer
      </Box>
    </Flex>
  );
}
