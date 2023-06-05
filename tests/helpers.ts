import * as jwt from 'jsonwebtoken';
import { prisma } from "@/config/database";

export async function cleanDb() {
  await prisma.user.deleteMany({});

}
