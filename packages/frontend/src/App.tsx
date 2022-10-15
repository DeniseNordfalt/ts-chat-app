import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import UserCreatePage from "./pages/UserCreatePage";
import axios from "axios";

import { MessageItem } from "@ts-chat-app/shared";

axios.defaults.baseURL =
  process.env.REACT_APP_TODO_API || "http://localhost:3001";

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

// const fetchMessages = async (): Promise<MessageItem[]> => {
//   const response = await axios.get<MessageItem[]>("/messages");
//   return response.data;
// };

// const MessageList = ({
//   messages,
//   error,
// }: {
//   messages: MessageItem[];
//   error?: string;
// }) => {
//   if (error) {
//     return <div>{error}</div>;
//   } else if (messages) {
//     return (
//       <div>
//         {messages.map((item) => {
//           return <p key={item.id}>{item.text}</p>;
//         })}
//       </div>
//     );
//   } else {
//     return <div>'Waiting for messages'</div>;
//   }
// };

// const MessageInput = ({
//   messageText,
//   setMessageText,
//   onCreate,
// }: {
//   messageText: string;
//   setMessageText: (text: string) => void;
//   onCreate: (text: string) => void;
// }) => {
//   return (
//     <>
//       <input
//         type="text"
//         value={messageText}
//         onChange={(e) => setMessageText(e.target.value)}
//       />
//       <button onClick={(e) => onCreate(messageText)}>Create message</button>
//     </>
//   );
// };

function App() {
  // const [messageText, setMessageText] = useState<string>("");
  // const [messages, setMessages] = useState<MessageItem[]>([]);
  // const [error, setError] = useState<string | undefined>();

  // const createMessage = async (messageText: string): Promise<void> => {
  //   const messageItem: MessageItem = {
  //     text: messageText,
  //     timeStamp: new Date(),
  //   };

  //   try {
  //     await axios.post("/messages", messageItem);
  //     const response = await axios.get<MessageItem[]>("/messages");
  //     setMessages(response.data);
  //   } catch (err) {
  //     setMessages([]);
  //     setError("Something went wrong when fetching my messages...");
  //   } finally {
  //     setMessageText("");
  //   }
  // };

  // useEffect(() => {
  //   fetchMessages()
  //     .then(setMessages)
  //     .catch((error) => {
  //       setMessages([]);
  //       setError("Something went wrong when fetching my messages...");
  //     });
  // }, []);

  return (
    <>
      <ChakraProvider>
        {/* <div className="App">
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
      </div> */}

        <Routes>
          <Route path="/register" element={<UserCreatePage />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
