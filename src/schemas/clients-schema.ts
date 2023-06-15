import Joi from "joi";

const fixDate = require('joi').extend(require('@joi/date'))

export const createClientSchema = Joi.object({
    name: Joi.string().required(),
    rg: Joi.string().required(),
    cpf: Joi.string().required(),
    phone: Joi.string().required(),
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




//   model Client {
//     id            
//     name          
//     rg            
//     cpf           
//     phone         
//     birthday      
//     occupation    
//     maritalStatus 
//     nationality   
//     birthPlace    
//     userId        
//     addressId     
//     createdAt    
//     updatedAt    
//   }
  
//   model Address {
//     id           
    // cep             
    // street       
    // city         
    // state        
    // number       
    // neighborhood 
    // complement   
//   }