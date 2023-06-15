import { LawyerEnroll } from "@/protocols";
import Joi from "joi";

export const createLawyerchema = Joi.object({
    name: Joi.string().required(),
    oab: Joi.string().required(),
    state: Joi.string().required()
})

