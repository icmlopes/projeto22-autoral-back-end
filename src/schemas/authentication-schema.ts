import { SignInParams } from "@/services/authentication-service";
import Joi from "joi";

export const loginSchema = Joi.object<SignInParams>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})