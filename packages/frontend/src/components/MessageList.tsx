import React from "react";
import { MessageItem } from "@ts-chat-app/shared";
import { Box } from "@chakra-ui/react";
import Message from "./Message";

export default function MessageList({
  messages,
  error,
}: {
  messages: MessageItem[];
  error?: string;
}) {
  if (error) {
    return <div>{error}</div>;
  } else if (messages.length === 0) {
    return <div>No messages have been sent yet...</div>;
  } else {
    return (
      <Box
        overflowY={"scroll"}
        scrollBehavior={"smooth"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
        }}
        padding={2}
        borderRadius={4}
        maxHeight={"calc(100vh - 200px)"}
      >
        {messages.map((message, index) => (
          <Box key={index}>
            <Message message={message} />
          </Box>
        ))}
        <Box id="end" />
      </Box>
    );
  }
}
