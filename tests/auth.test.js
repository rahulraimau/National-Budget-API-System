const request = require("supertest");
const app = require("../server");

describe("Auth APIs", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Rahul", email: "rahul@test.com", password: "123456" });
    expect(res.statusCode).toBe(201);
  });

  it("should login user and return JWT", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "rahul@test.com", password: "123456" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });
});
