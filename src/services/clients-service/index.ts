import { duplicatedCpfError, notFoundError } from "@/errors";
import clientRepository from "@/repositories/client-repository";
import { Client } from "@prisma/client";

export async function createNewLawyer(
  name: string,
  rg: string,
  cpf: string,
  phone: string,
  birthday: string,
  occupation: string,
  maritalStatus: string,
  nationality: string,
  birthPlace: string,
  userId: number,
  cep: string,
  street: string,
  city: string,
  state: string,
  number: string,
  neighborhood: string,
  complement: string
): Promise<Client> {
  try {

    await verifyIfCPFAlreadyRegister(cpf)

    const getAddresId = await createNewAddres(cep, street, city, state, number, neighborhood, complement);

    return clientRepository.createClient({
      name,
      rg,
      cpf,
      phone,
      birthday,
      occupation,
      maritalStatus,
      nationality,
      birthPlace,
      userId,
      addressId: getAddresId.id
    });
  } catch (error) {
    throw error; // Retorna a rejeição para ser tratada no controlador
  }
}

async function createNewAddres(cep: string,
    street: string,
    city: string,
    state: string,
    number: string,
    neighborhood: string,
    complement: string) {
  try {

    return clientRepository.createAddres({
      cep, 
      street,
      city,
      state,
      number,
      neighborhood,
      complement
    });
  } catch (error) {
    throw error; // Retorna a rejeição para ser tratada no serviço `createNewLawyer`
  }
}

async function verifyIfCPFAlreadyRegister(cpf: string){

  const findCpf = await clientRepository.findClientByCpf(cpf)

  if(findCpf){
    throw duplicatedCpfError()
  }
  
}

async function getClientByName(name: string){

    const client = await clientRepository.findClientByName(name)

    if(!client){
        throw notFoundError()
    }
}

export async function getAllClients(userId: number){

  const client = await clientRepository.getAllClients(userId)

  if(!client){
      throw notFoundError()
  }

  return client
}


const clientService = {
    createNewLawyer,
    getClientByName,
    getAllClients,
    verifyIfCPFAlreadyRegister
};

export default clientService;
