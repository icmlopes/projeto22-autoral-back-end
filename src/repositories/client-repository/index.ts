import { prisma } from "../../config/database";
import { Client, Prisma } from "@prisma/client";

async function createClient(data: Prisma.ClientUncheckedCreateInput){
    return prisma.client.create({
        data,
    })
}

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

async function getClientById(id: number){
    return prisma.client.findFirst({
        where:{
            id,
        }
    })
}

async function updateClientInfomation(id: number, updates: Partial<Client>){

    return prisma.client.update({
        where: { 
            id 
        },
        data: updates
    })
}

async function deleteClientInformation(id: number){

    return prisma.client.delete({
        where: {
            id
        }
    })
}

const clientRepository = {
    createClient,
    createAddres,
    findClientByName,
    getAllClients,
    findClientByCpf,
    getClientById,
    updateClientInfomation,
    deleteClientInformation
}

export default clientRepository;