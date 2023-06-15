import { invalidCredentialsError } from "@/errors";
import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/users-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserByEmail(email);

  await validatePassword(password, user.password);

  const token = await createSession(user.id);

  return {
    user: { id: user.id, email: user.email },
    token
  };
}


async function getUserByEmail(email: string): Promise<GetUserResult> {
  const user = await userRepository.findByEmail(email);

  if (!user) throw invalidCredentialsError();

  return user
}

async function validatePassword(password: string, userPassword: string) {
  const isValid = await bcrypt.compare(password, userPassword);

  if (!isValid) throw invalidCredentialsError();
}

async function createSession(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  await sessionRepository.newSession({
    token,
    userId,
  });

  return token
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
};

export default authenticationService;
                                                  