import Joi from "joi";

const fixDate = require('joi').extend(require('@joi/date'))

export const createClientSchema = Joi.object({
    name: Joi.string().required(),
    rg: Joi.string().required(),
    cpf: Joi.string().min(11).max(11).required(),
    phone: Joi.string().min(11).max(11).required(),
    birthday: fixDate.date().format("DD-MM-YYYY"),
    occupation: Joi.string(),
    nationality: Joi.string(),
    maritalStatus: Joi.string(),
    birthPlace: Joi.string(),
    cep: Joi.string(),             
    street: Joi.string(), 
    city: Joi.string(),
    state: Joi.string(), 
    number: Joi.string(), 
    neighborhood: Joi.string(), 
    complement: Joi.string()
})



export const updateClientSchema = Joi.object({
    name: Joi.string(),
    rg: Joi.string(),
    cpf: Joi.string().min(11).max(11),
    phone: Joi.string().min(11).max(11),
    birthday: fixDate.date().format("DD-MM-YYYY"),
    occupation: Joi.string(),
    nationality: Joi.string(),
    maritalStatus: Joi.string(),
    birthPlace: Joi.string(),
    cep: Joi.string(),             
    street: Joi.string(), 
    city: Joi.string(),
    state: Joi.string(), 
    number: Joi.string(), 
    neighborhood: Joi.string(), 
    complement: Joi.string()
})
