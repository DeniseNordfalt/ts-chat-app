import React, { useState } from "react";
import { UserItem } from "@ts-chat-app/shared";
import FormInput from "../components/molecules/FormInput";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

type Props = {};

export default function UserCreatePage({}: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const createUser = async (
    username: string,
    password: string,
    email: string
  ) => {
    const user: UserItem = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/users", user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
      setPassword("");
      setEmail("");
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser(username, password, email);
        }}
      >
        <FormInput
          id="username"
          label="Username"
          value={username}
          setValue={setUsername}
        />

        <FormInput
          id="email"
          label="Email"
          value={email}
          setValue={setEmail}
          type="email"
        />

        <FormInput
          id="password"
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
