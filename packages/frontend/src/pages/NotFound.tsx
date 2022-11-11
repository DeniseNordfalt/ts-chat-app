import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"red.600"}>
            404
          </Heading>
          <Heading fontSize={"2xl"}>Page not found</Heading>
        </Stack>
      </Stack>
    </Flex>
  );
}
