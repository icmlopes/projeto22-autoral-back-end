import { prisma } from "../../database";
import { Prisma } from "@prisma/client";


async function createUser(data: Prisma.UserUncheckedCreateInput){
    return prisma.user.create({
        data,
    })
}

async function findByEmail(email: string){
    return prisma.user.findFirst ({
        where:{
            email,
        }
    })
}

const userRepository = {
    createUser,
    findByEmail,
}

export default userRepository;