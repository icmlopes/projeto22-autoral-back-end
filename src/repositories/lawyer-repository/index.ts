import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";


async function createLawyer(data: Prisma.LawyerUncheckedCreateInput){
    return prisma.lawyer.create({
        data,
    })
}

// async function createLawyer(name: string, userId: number, barNumberId: number){
//     return prisma.lawyer.create({
//         name,
//         userId,
//         barNumberId,
//     })
// }

async function createBar(data: Prisma.BarNumberUncheckedCreateInput){
    return prisma.barNumber.create({
        data,
    })
}

async function findByBarNumberByOab(oab: string){
    return prisma.barNumber.findFirst ({
        where:{
            oab,
        }
    })
}

const lawyerRepository = {
    createLawyer,
    createBar,
    findByBarNumberByOab,
}

export default lawyerRepository;