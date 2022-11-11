import React, { useState } from "react";
import FormInput from "../components/molecules/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Box, Heading } from "@chakra-ui/react";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function UserLoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginUser = async (username: string, password: string) => {
    const user = {
      username,
      password,
    };
    try {
      const response = await axios.post("/auth/login", user);
      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Box maxWidth={"600px"} margin={"auto"} paddingTop={"10vh"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(username, password);
        }}
      >
        <Heading
          color={"teal.800"}
          paddingLeft={4}
          paddingTop={4}
          paddingBottom={6}
        >
          Login
        </Heading>

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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button margin={2} marginLeft={4} type="submit">
              Login
            </Button>
            <Button
              margin={2}
              marginRight={4}
              onClick={() => navigate("/register")}
            >
              Need an account?
            </Button>
          </Box>
        </div>
      </form>
    </Box>
  );
}
