import {faker} from '@faker-js/faker';
import { prisma } from '@/config/database';
import { Lawyer } from '@prisma/client';

// export async function createLawyer(params: Partial<Lawyer> = {}): Promise<Lawyer> {

//   return prisma.lawyer.create({
//     data: {
//       name: faker.person.fullName(),
//       userId: faker.number.int(),
//       barNumberId: faker.number.int()
//     },
//   });
// }

export async function createLawyer(name: string, userId: number, barNumberId: number) {

  return prisma.lawyer.create({
    data: {
      name: faker.person.fullName(),
      userId: userId,
      barNumberId: barNumberId
    },
  });
}

export async function createBarNumber(oab: string, state: string){

  return prisma.barNumber.create({
    data:{
      oab: faker.string.numeric(),
      state: faker.string.alpha(),
    }
  })
}
