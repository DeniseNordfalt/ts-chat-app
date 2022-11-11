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
    <Flex paddingTop={4}>
      <Input
        type={"text"}
        value={messageText}
        placeholder="Enter message"
        onChange={(e) => setMessageText(e.target.value)}
        bg={"white"}
        marginRight={2}
        marginLeft={2}
      />
      <Button
        onClick={onCreate}
        marginRight={4}
        paddingLeft={8}
        paddingRight={8}
      >
        Send
      </Button>
    </Flex>
  );
}
