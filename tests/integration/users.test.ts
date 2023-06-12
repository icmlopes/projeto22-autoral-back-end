import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/users-factory";
import { cleanDb } from "../helpers";
import { prisma } from "@/config/database";
import app from "@/app";
import { duplicatedEmailError } from "@/errors";

beforeAll(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /register", () => {
  it("Should respond with status 400 when body is not given", async () => {
    const response = await server.post("/register");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/register").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
  const generateValidBody = () => ({
    email: faker.internet.email(),
    password: faker.string.alphanumeric(6),
    userType: "advogado"
  })

  it("should not return user password in the response body", async () => {
    const body = generateValidBody();
    
    await createUser(body);

    const response = await server.post("/register").send(body);

    expect(response.body).not.toHaveProperty("password");
  });

  it("Should respond with status 409 when user already has an account with the registered email ", async () => {
    // const body = generateValidBody();

    const newEmail = faker.internet.email();
    const newPassword = faker.string.alphanumeric(6);
    const userType = "Advogado";

    const userBody = {
      email: newEmail,
      password: newPassword,
      userType: userType,
    };

    await createUser(userBody);

    const newUserBody = {
      email: newEmail,
      password: newPassword,
      confirmPassword: newPassword,
      userType: userType,
    };

    // const user = await prisma.user.findUnique({
    //   where: { email: userBody.email },
    // });

    const response = await server.post("/register").send(newUserBody);

    console.log("1 - vendo aqui", response.status)
    console.log("2 - vendo aqui", httpStatus.CONFLICT)
    console.log("3 - vendo aqui", response.body)


    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(response.body).toEqual({
      name: "DuplicatedEmailError",
      message: "Esse e-mail já possui uma conta em nosso sistema!",
    });


  });

  it("Should respond with status 409 when password and passwordConfirm are different", async () => {
    const newEmail = faker.internet.email();
    const newPassword = faker.internet.password();
    const ConfirmNewPassword = faker.internet.password();
    const userType = "Advogado";

    const body = {
      email: newEmail,
      password: newPassword,
      confirmPassword: ConfirmNewPassword,
      userType: userType,
    };
    const response = await server.post("/register").send(body);

    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(response.body).toEqual({
      name: "differentPasswordError",
      message: "As senhas precisam ser iguais!",
    });
  });
  it("Should respond with status 201 when user created", async () => {
    const newEmail = faker.internet.email();
    const newPassword = faker.internet.password();
    const userType = "Advogado";

    const body = {
      email: newEmail,
      password: newPassword,
      confirmPassword: newPassword,
      userType: userType,
    };

    const response = await server.post("/register").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
  });

})
})


