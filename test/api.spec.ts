import request from "supertest";

import app from "../src/app";

describe("GET /api/auth/renew", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/auth/renew-token").expect(200);
  });
});
