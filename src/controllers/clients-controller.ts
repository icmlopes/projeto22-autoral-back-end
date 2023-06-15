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
