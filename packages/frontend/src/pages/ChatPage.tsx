import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useEventSource,
  useEventSourceListener,
} from "@react-nano/use-event-source";
import { MessageItem } from "@ts-chat-app/shared";
import ChatInput from "../components/molecules/ChatInput";
import MessageList from "../components/MessageList";

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
      setError("Something went wrong when fetching my messages...");
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

  return (
    <div>
      <header className="App-header">My Message Lists</header>
      <section className="App-content">
        <MessageList messages={messages} error={error} />
      </section>
      <footer className="App-footer">
        <ChatInput
          onCreate={() => createMessage(messageText)}
          setMessageText={setMessageText}
          messageText={messageText}
        />
      </footer>
    </div>
  );
}
