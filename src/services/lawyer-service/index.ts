import { duplicatedOabError } from "@/errors";
import lawyerRepository from "@/repositories/lawyer-repository";
import { Lawyer } from "@prisma/client";
import bcrypt from 'bcrypt';

// export async function createNewLawyer(name: string, userId: number, oab: string, state: string): Promise<Lawyer>{

//     console.log("Tõ no service na função createNewLawyer", name, userId, oab, state)

//     const getBarNumberId = await createBarNumber(oab, state)

//     return lawyerRepository.createLawyer({
//         name,
//         userId,
//         barNumberId: getBarNumberId.id,
//     })
// }


// async function createBarNumber(oab: string, state: string){
    

//     await validateUniqueOab(oab)

//     return lawyerRepository.createBar({
//         oab,
//         state
//     })
// }


// async function validateUniqueOab(oab: string){

//     const sameOab = await lawyerRepository.findByBarNumberByOab(oab)

//     if (sameOab && sameOab.oab === oab) {
//         throw duplicatedOabError();
//       }
// }

// A PARTIR DAQUI HEEEIN

export async function createNewLawyer(name: string, userId: number, oab: string, state: string): Promise<Lawyer> {

    try {
        const getBarNumberId = await createBarNumber(oab, state);

        return lawyerRepository.createLawyer({
            name,
            userId,
            barNumberId: getBarNumberId.id,
        });
    } catch (error) {
        throw error; // Retorna a rejeição para ser tratada no controlador
    }
}

async function createBarNumber(oab: string, state: string) {
    try {
        await validateUniqueOab(oab);

        return lawyerRepository.createBar({
            oab,
            state
        });
    } catch (error) {
        throw error; // Retorna a rejeição para ser tratada no serviço `createNewLawyer`
    }
}

async function validateUniqueOab(oab: string) {
    try {
        const sameOab = await lawyerRepository.findByBarNumberByOab(oab);

        if (sameOab && sameOab.oab === oab) {
            throw duplicatedOabError();
        }
    } catch (error) {
        throw error; // Retorna a rejeição para ser tratada no serviço `createBarNumber`
    }
}

const lawyerService = {
    createNewLawyer,
}

export default lawyerService;
