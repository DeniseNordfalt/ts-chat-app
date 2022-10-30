import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

type Props = {
  messageText: string;
  setMessageText: (messageText: string) => void;
  onCreate: () => void;
};

export default function ChatInput({
  messageText,
  setMessageText,
  onCreate,
}: Props) {
  return (
    <Flex>
      <Input
        type={"text"}
        value={messageText}
        placeholder="Enter message"
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button onClick={onCreate}>Send message</Button>
    </Flex>
  );
}
