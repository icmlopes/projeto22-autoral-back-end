import { UserRegister } from "@/protocols";
import Joi from "joi";

export const createUserSchema = Joi.object<UserRegister>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
})