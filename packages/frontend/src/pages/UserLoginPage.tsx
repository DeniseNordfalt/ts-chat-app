import React, { useState } from "react";
import FormInput from "../components/molecules/FormInput";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

type Props = {};

export default function UserLoginPage({}: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (username: string, password: string) => {
    const user = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post("/auth/login", user);
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(username, password);
        }}
      >
        <div>
          <FormInput
            id="username"
            label="Username"
            value={username}
            setValue={setUsername}
          />

          <FormInput
            id="password"
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />

          <button type="submit">Login</button>
        </div>
      </form>
      <div>{username}</div>
    </div>
  );
}
