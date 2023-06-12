import app from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/users-factory";

const server = supertest(app);
beforeAll(async () => {
  await cleanDb();
});

describe("POST /", () => {
  it("Should respond with status 400 when body is not given", async () => {
    const response = await server.post("/");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.string.alphanumeric(6),
    });

    it("Should respond with status 401 when user does not have an account yet", async () => {
      const body = generateValidBody();

      const response = await server.post("/").send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("Should respond with status 401 when the password is wrong", async () => {
      const newEmail = faker.internet.email();
      const newPassword = faker.internet.password();
      const userType = "advogado";

      const body = {
        email: newEmail,
        password: newPassword,
        userType: userType,
      };
      await createUser(body);
      const wrongPassword = faker.string.alphanumeric(6);
      const newBody = {
        email: newEmail,
        password: wrongPassword,
      };
      const response = await server.post("/").send(newBody);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("Should respond with status 200 when user are logged and status OK", async () => {
      const newEmail = faker.internet.email();
      const newPassword = faker.string.alphanumeric(6);
      const userType = "advogado";

      const body = {
        email: newEmail,
        password: newPassword,
        userType: userType,
      };

      await createUser(body);

      const loginBody = {
        email: newEmail,
        password: newPassword,
      };
      const response = await server.post("/").send(loginBody);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
