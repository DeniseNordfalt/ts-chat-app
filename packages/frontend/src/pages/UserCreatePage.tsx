import React, { useState } from "react";
import UserItem from "../user-item";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

type Props = {};

const UserInput = ({
  name,
  setName,
  password,
  setPassword,
  onCreate,
}: {
  name: string;
  setName: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  onCreate: (name: string, password: string) => void;
}) => {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => onCreate(name, password)}>Create user</button>
    </>
  );
};

export default function UserCreatePage({}: Props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const createUser = async (name: string, password: string) => {
    const userItem: UserItem = {
      name: name,
      password: password,
    };

    try {
      await axios.post("/users", userItem);
    } catch (error) {
      setError("nope");
    } finally {
      setName("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1>UserCreatePage</h1>
      <UserInput
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        onCreate={createUser}
      />
    </div>
  );
}
