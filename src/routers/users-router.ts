import { registerUser } from "@/controllers";
import { validateBody } from "@/middlewares/validation-middleware";
import { createUserSchema } from "@/schemas/users-schama";
import { Router } from "express";



const usersRouter = Router()

usersRouter.post('/register', validateBody(createUserSchema), registerUser);

export { usersRouter }