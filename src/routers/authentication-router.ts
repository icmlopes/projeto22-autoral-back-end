import { loginSchema } from '@/schemas/authentication-schema';
import { validateBody } from "@/middlewares/validation-middleware";
import { Router } from "express";
import { login } from '@/controllers';

const authenticationRouter = Router()

authenticationRouter.post('/signin', validateBody(loginSchema), login);

export { authenticationRouter }