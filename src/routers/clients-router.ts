import { getAllClients, registerClient } from "@/controllers";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createClientSchema } from "@/schemas";
import { Router } from "express";

const clientRouter = Router()


clientRouter.all('*', authenticateToken);
clientRouter.post('/client',validateBody(createClientSchema), registerClient);
clientRouter.get('/client', getAllClients)

export { clientRouter }