import request from "supertest";
// import { app } from "../src/index";
const app = "http://localhost:3001/api";

describe("POST /auth/register", () => {
  it("should register a new user if input is valid", async () => {
    const response = await request(app).post("/auth/register").send({
      fname: "test2",
      lname: "user2",
      mobile: "34567789",
      email: "testuser2@example.com",
      username: "testuser2",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.data.userData).toHaveProperty("userId");
  });

  it("should return a 400 error if input validation fails", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "invalid-email", // Invalid email
      password: "short", // Invalid password (too short)
    });

    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty("message"); // Assuming you return validation errors
  });
});
