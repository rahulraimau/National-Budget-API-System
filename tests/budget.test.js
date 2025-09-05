const request = require("supertest");
const app = require("../server");

describe("Budget APIs", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "rahul@test.com", password: "123456" });
    token = res.body.token;
  });

  it("should create a budget entry", async () => {
    const res = await request(app)
      .post("/api/budgets")
      .set("Authorization", `Bearer ${token}`)
      .send({ department: "Education", amount: 500000 });
    expect(res.statusCode).toBe(201);
  });

  it("should fetch all budgets", async () => {
    const res = await request(app)
      .get("/api/budgets")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
