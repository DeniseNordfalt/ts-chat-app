import React from "react";
import { MessageItem } from "@ts-chat-app/shared";
import { Box } from "@chakra-ui/react";

export default function Message({ message }: { message: MessageItem }) {
  return (
    <Box
      bg={"gray.100"}
      padding={2}
      borderRadius={4}
      marginTop={4}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box as="span" fontWeight="bold" fontStyle="italic" paddingStart={2}>
        {message.username}
      </Box>
      <hr />
      <Box as="span" paddingTop={2} paddingStart={2}>
        {message.text}
      </Box>

      <Box
        as="span"
        fontSize={"xs"}
        color={"gray.500"}
        justifyContent="flex-end"
        display="flex"
      >
        {new Date(message.timeStamp).toLocaleString()}
      </Box>
    </Box>
  );
}
