import { deleteClient, getAllClients, registerClient, updateClientInformation } from "@/controllers";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createClientSchema, updateClientSchema } from "@/schemas";
import { Router } from "express";

const clientRouter = Router()


clientRouter.all('*', authenticateToken);
clientRouter.post('/client',validateBody(createClientSchema), registerClient);
clientRouter.get('/client', getAllClients)
clientRouter.patch('/client/:id', validateBody(updateClientSchema), updateClientInformation)
clientRouter.delete('/client/:id', deleteClient)

export { clientRouter }