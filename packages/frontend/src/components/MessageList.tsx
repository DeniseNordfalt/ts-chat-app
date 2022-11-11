import React from "react";
import { MessageItem } from "@ts-chat-app/shared";

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
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            User: {message.username} - Message: {message.text} - Time:
            {message.timeStamp.toString()}
          </div>
        ))}
      </div>
    );
  }
}
