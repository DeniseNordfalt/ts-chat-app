import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageItem } from "@ts-chat-app/shared";
import { Input, Button, Flex } from "@chakra-ui/react";

import {
  useEventSource,
  useEventSourceListener,
} from "@react-nano/use-event-source";

axios.defaults.baseURL = "http://localhost:4000";

type Props = {};

export default function ChatPage({}: Props) {
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [eventSource] = useEventSource("http://localhost:4000/sse", true);

  useEventSourceListener(
    eventSource,
    ["message"],
    (event) => {
      const message = JSON.parse(event.data) as MessageItem;
      console.log("message", message);

      setMessages((messages) => [...messages, message]);
    },
    [setMessages]
  );

  const fetchMessages = async (): Promise<MessageItem[]> => {
    const response = await axios.get<MessageItem[]>("/messages");
    console.log(response.data);
    return response.data;
  };

  const MessageList = ({
    messages,
    error,
  }: {
    messages: MessageItem[];
    error?: string;
  }) => {
    if (error) {
      return <div>{error}</div>;
    } else if (messages) {
      return (
        <div>
          {messages.map((item) => {
            return <p key={item._id}>{item.text}</p>;
          })}
        </div>
      );
    } else {
      return <div>'Waiting for messages'</div>;
    }
  };

  const MessageInput = ({
    messageText,
    setMessageText,
    onCreate,
  }: {
    messageText: string;
    setMessageText: (text: string) => void;
    onCreate: (text: string) => void;
  }) => {
    return (
      <>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          p={4}
          //   bg="gray.100"
        >
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          <Button onClick={(e) => onCreate(messageText)}>Send message</Button>
        </Flex>
      </>
    );
  };

  const createMessage = async (messageText: string): Promise<void> => {
    const messageItem: MessageItem = {
      author: "test",
      text: messageText,
      timeStamp: new Date(),
    };

    // try {
    //   await axios.post("/messages", messageItem);
    //   const response = await axios.get<MessageItem[]>("/messages");
    //   setMessages(response.data);
    // } catch (err) {
    //   setMessages([]);
    //   setError("Something went wrong when fetching my messages...");
    // } finally {
    //   setMessageText("");
    // }
    try {
      await axios.post(`/messages`, messageItem, {
        withCredentials: true,
      });
      setMessageText("");
    } catch (err) {
      setError("Something went wrong when fetching my messages...");
    }
  };

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages([]);
        setError("Something went wrong when fetching my messages...");
      });
  }, []);

  return (
    <div>
      <header className="App-header">My Message Lists</header>
      <section className="App-content">
        <MessageList messages={messages} error={error} />
      </section>
      <footer className="App-footer">
        <MessageInput
          onCreate={createMessage}
          setMessageText={setMessageText}
          messageText={messageText}
        />
      </footer>
    </div>
  );
}
