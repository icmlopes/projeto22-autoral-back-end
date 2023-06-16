import { AuthenticatedRequest } from "./../middlewares/authentication-middleware";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import clientService from "@/services/clients-service";

export async function registerClient(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  const {
    name,
    rg,
    cpf,
    phone,
    birthday,
    occupation,
    maritalStatus,
    nationality,
    birthPlace,
    cep,
    street,
    city,
    state,
    number,
    neighborhood,
    complement,
  } = req.body;

  try {
    const newClient = await clientService.createNewLawyer(
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
      cep,
      street,
      city,
      state,
      number,
      neighborhood,
      complement
    );

    return res.status(httpStatus.OK).send({
      id: newClient.id,
      name: newClient.name,
    });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err.message || "Erro ao cadastrar cliente");
  }
}

export async function getAllClients(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    const { userId } = req

  try {

    const allClients = await clientService.getAllClients(userId)

    return res.status(httpStatus.OK).send(allClients)

  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err.message);
  }
}


export async function updateClientInformation(req: AuthenticatedRequest, res: Response, next: NextFunction){

  const { userId } = req

  const id  = Number(req.params.id)

  const updates = req.body

  try{

    const client = await clientService.updateClient(id, updates)

    return res.status(httpStatus.OK).send(client)    

  } catch(err){

    return res.status(httpStatus.BAD_REQUEST).send(err.message);
  }
}


export async function deleteClient(req: AuthenticatedRequest, res: Response, next: NextFunction){

  const { userId } = req

  const id = Number(req.params.id)

  try{

    await clientService.deleteClient(id)

    return res.status(httpStatus.OK).send("Cliente apagado com sucesso")

  } catch(err){

    return res.status(httpStatus.BAD_REQUEST).send(err.message);


  }
}