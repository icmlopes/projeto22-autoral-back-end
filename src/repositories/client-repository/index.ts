import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

async function createClient(data: Prisma.ClientUncheckedCreateInput){
    return prisma.client.create({
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

async function createAddres(data: Prisma.AddressUncheckedCreateInput){
    return prisma.address.create({
        data,
    })
}

async function findClientByCpf(cpf: string){
    return prisma.client.findFirst ({
        where:{
            cpf,
        }
    })
}

async function findClientByName(name: string){
    return prisma.client.findFirst ({
        where:{
            name,
        }
    })
}

async function getAllClients(userId: number){
    return prisma.client.findMany({
        where:{
            userId,
        }
    })
}

const clientRepository = {
    createClient,
    createAddres,
    findClientByName,
    getAllClients,
    findClientByCpf
}

export default clientRepository;