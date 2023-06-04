import * as jwt from 'jsonwebtoken';
import { prisma } from "@/database";

export async function cleanDb() {
  await prisma.user.deleteMany({});

}
