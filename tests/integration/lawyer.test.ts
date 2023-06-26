import * as jwt from 'jsonwebtoken';
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/users-factory";
import { cleanDb } from "../helpers";
import app from "@/app";
import { duplicatedEmailError } from "@/errors";
import { createBarNumber, createLawyer } from '../factories/lawyer-factory';

beforeAll(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /lawyer", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/lawyer");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/lawyer").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });
  it("should respond with status 401 if there is no session for given token", async () => {

    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      userType: "advogado",
    }
    const userWithoutSession = await createUser(body);
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );
    const response = await server.post("/lawyer").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 when body is not given", async () => {
    const response = await server.post("/lawyer");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/lawyer").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when body is valid", () => {
    // it("should respond with status 409 when lawyer already register", async () => {
    //   const loginBody = {
    //     email: faker.internet.email(),
    //     password: faker.internet.password(),
    //     userType: "advogado",
    //   }
    //   const user = await createUser(loginBody);
    
    //   const token = jwt.sign(
    //     { userId: user.id },
    //     process.env.JWT_SECRET
    //   );

    //   const name = faker.person.firstName()
    //   const oab = "123456"
    //   const state = "são paulo"
    
    //   const barNumber = await createBarNumber(oab, state)
    
    //   await createLawyer(name, user.id, barNumber.id)
    
    //   const sameLawyer = await createLawyer(name, user.id, barNumber.id)
    
    //   const response = await server.post("/lawyer").set("Authorization", `Bearer ${token}`);
    // });

  })

})