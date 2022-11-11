import React, { useState } from "react";
import { UserItem } from "@ts-chat-app/shared";
import FormInput from "../components/molecules/FormInput";
import { useNavigate } from "react-router-dom";
import { Button, Heading, Box } from "@chakra-ui/react";

import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function UserCreatePage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const createUser = async (
    username: string,
    password: string,
    email: string
  ) => {
    const user: UserItem = {
      username,
      email,
      password,
    };
    try {
      await axios.post("/users", user);
      navigate("/login");
    } catch (error) {
      setError("Username or email already exists");
    } finally {
      setUsername("");
      setPassword("");
      setEmail("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(username, password, email);
  };

  return (
    <Box maxWidth={"600px"} margin={"auto"} paddingTop={"10vh"}>
      <Heading
        color={"teal.800"}
        paddingLeft={4}
        paddingTop={4}
        paddingBottom={6}
      >
        Register
      </Heading>
      <form
        id="create-user-form"
        onSubmit={(e) => {
          handleSubmit(e);
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
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button type="submit" margin={2} marginLeft={4}>
            Register
          </Button>
          <Button margin={2} marginRight={4} onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </Box>
      </form>
      {error && <div>{error}</div>}
    </Box>
  );
}
