import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useEventSource,
  useEventSourceListener,
} from "@react-nano/use-event-source";
import { MessageItem } from "@ts-chat-app/shared";
import ChatInput from "../components/molecules/ChatInput";
import MessageList from "../components/MessageList";
import { Box } from "@chakra-ui/react";

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers.authorization = `Bearer ${jwt}`;
  }
  return config;
});

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
export default function ChatPage() {
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [eventSource] = useEventSource(`${axios.defaults.baseURL}/sse`, true);

  useEventSourceListener(
    eventSource,
    ["message"],
    (event) => {
      const message = JSON.parse(event.data) as MessageItem;

      setMessages((messages) => [...messages, message]);
    },
    [setMessages]
  );

  const fetchMessages = async (): Promise<MessageItem[]> => {
    const token = localStorage.getItem("jwt_token");
    const response = await axios.get<MessageItem[]>("/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const createMessage = async (messageText: string): Promise<void> => {
    const token = localStorage.getItem("jwt_token");
    const messageItem: Partial<MessageItem> = {
      text: messageText,
    };

    try {
      await axios.post(`/messages`, messageItem, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessageText("");
    } catch (error) {
      setError("Error sending message");

      setInterval(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    fetchMessages()
      .then((messages) => {
        setMessages(messages);
      })
      .catch(() => {
        setMessages([]);
        setError("something went wrong when fetching my messages...");
      });
  }, []);

  useEffect(() => {
    const end = document.getElementById("end");
    if (end) {
      end.scrollIntoView();
    }
  }, [messages]);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Box minH={"80vh"}>
        <MessageList messages={messages} error={error} />
      </Box>
      <Box bottom={0}>
        <ChatInput
          onCreate={() => createMessage(messageText)}
          setMessageText={setMessageText}
          messageText={messageText}
        />
      </Box>
    </Box>
  );
}
