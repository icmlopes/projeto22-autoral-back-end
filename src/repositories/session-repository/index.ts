import { prisma } from "@/config";
import { Prisma } from "@prisma/client";


async function newSession(data: Prisma.SessionUncheckedCreateInput){
    return prisma.session.create({
        data,
    })
}

const sessionRepository = {
    newSession,
}

export default sessionRepository;