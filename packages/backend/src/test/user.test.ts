import { describe, expect, test } from "@jest/globals";
import { Response, Request } from "express";
import { saveUser } from "../controllers/users";
import { UserItem } from "@ts-chat-app/shared";

jest.mock("../models/users-repository");

const mockRequest = (body: UserItem) => {
  return { body } as Request<UserItem>;
};

const mockResponse = () => {
  const res = {} as Response<string>;

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};

describe("User controller", () => {
  test("should return 201 when user is created", async () => {
    const req = mockRequest({
      username: "test",
      email: "test@test.se",
      password: "test",
    });
    const res = mockResponse();

    await saveUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("User created");
  });

  test("should return 400 when username is missing", async () => {
    const req = mockRequest({
      username: "",
      email: "test@test.se",
      password: "test",
    });

    const res = mockResponse();

    await saveUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Invalid name on user item!");
  });
});
