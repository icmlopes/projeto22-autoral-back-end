import bcrypt from 'bcrypt';
import {faker} from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config/database';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.string.alphanumeric(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email,
      password: hashedPassword,
      userType: "advogado"
    },
  });
}
