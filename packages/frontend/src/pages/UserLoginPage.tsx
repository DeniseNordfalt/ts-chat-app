import React, { useState } from "react";
import FormInput from "../components/molecules/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Box } from "@chakra-ui/react";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function UserLoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  const navigate = useNavigate();
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
    </div>
  );
}
