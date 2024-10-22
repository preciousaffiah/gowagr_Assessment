import request from "supertest";
// import { app } from "../src/index";
const app = "http://localhost:3001/api";

let user: any = {};
let token: string;

beforeAll(async () => {
  const response = await request(app).post("/auth/register").send({
    fname: "test",
    lname: "user",
    mobile: "34567789",
    email: "testuser@example.com",
    username: "testuser",
    password: "password123",
  });

  expect(response.status).toBe(201);
  expect(response.body.data.data.userData).toHaveProperty("userId");
  user = response.body.data.data.userData;
  token = response.body.data.data.token;
  console.log(`tis is toke ${token}, ${response.body.data.data.token}`);
});

describe("POST /auth/login", () => {
  it("should login an existing user if input is valid", async () => {
    const response = await request(app).post("/auth/login").send({
      email: user.email,
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.data).toHaveProperty("token");
    token = response.body.data.data.token;
    console.log(`tis is toke ${token}, ${response.body.data.data.token}`);
  });

  it("should return a 400 error if input validation fails", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "testuser", // Invalid field
      email: "invalid-email",
      password: "short",
    });

    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty("message");
  });

  it("should return a 401 error if any value is incorrect", async () => {
    const response = await request(app).post("/auth/login").send({
      email: user.email,
      password: "password1234", //incorrect password
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe("GET /user/:id", () => {
  it("should return an existing user", async () => {
    console.log(`tis is toke ${token}`);

    const response = await request(app)
      .get(`/user/${user.userId}`)
      .set("Authorization", `Bearer ${token}`); // Set the auth header;

    expect(response.status).toBe(200);
    expect(response.body.data.data).toHaveProperty("userId");
  });

  it("should return a 404 error if user does not exist", async () => {
    const response = await request(app)
      .get("/user/invalidId")
      .set("Authorization", `Bearer ${token}`); // Set the auth header;
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should return a 401 error if input validation fails", async () => {
    const response = await request(app).get("/user/invalidId");

    expect(response.status).toBe(401);
    expect(response.body.data).toHaveProperty("message");
  });
});

describe("GET /user/username/:username", () => {
  it("should return an existing user", async () => {
    console.log(`tis is toke ${token}`);

    const response = await request(app)
      .get(`/user/username/${user.username}`)
      .set("Authorization", `Bearer ${token}`); // Set the auth header;

    expect(response.status).toBe(200);
    expect(response.body.data.data).toHaveProperty("userId");
  });

  it("should return a 404 error if user does not exist", async () => {
    const response = await request(app)
      .get("/user/username/randomUsername")
      .set("Authorization", `Bearer ${token}`); // Set the auth header;
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should return a 401 error if input validation fails", async () => {
    const response = await request(app).get("/user/username/randomUsername");

    expect(response.status).toBe(401);
    expect(response.body.data).toHaveProperty("message");
  });
});

describe("GET /transaction", () => {
  it("should create a transaction", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        fname: "test",
        lname: "user",
        mobile: "34567789",
        email: "testuser@example.com",
        username: "testuser",
        password: "password123",
      })
      .set("Authorization", `Bearer ${token}`); // Set the auth header;

    expect(response.status).toBe(200);
    expect(response.body.data.data).toHaveProperty("userId");
  });

  it("should return a 404 error if user does not exist", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        fname: "test",
        lname: "user",
        mobile: "34567789",
        email: "testuser@example.com",
        username: "testuser",
        password: "password123",
      })
      .set("Authorization", `Bearer ${token}`); // Set the auth header;
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should return a 401 error if input validation fails", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        fname: "test",
        lname: "user",
        mobile: "34567789",
        email: "testuser@example.com",
        username: "testuser",
        password: "password123",
      })
      .set("Authorization", `Bearer ${token}`); // Set the auth header;

    expect(response.status).toBe(401);
    expect(response.body.data).toHaveProperty("message");
  });
});
