import { duplicatedEmailError } from "@/errors";
import userRepository from "@/repositories/users-repository";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';

export async function createUser({ email, password }: CreateUserParams): Promise<User>{

    await validateUniqueEmail(email)

    const hashedPassword = await bcrypt.hash(password, 12)

    return userRepository.createUser({
        email,
        password: hashedPassword,
    })
}

async function validateUniqueEmail(email: string){
    const sameEmail = await userRepository.findByEmail(email)
    if(sameEmail){
        throw duplicatedEmailError()
    }
}

export type CreateUserParams = Pick<User, 'email' | 'password'>


const userService = {
    createUser,
}

export default userService;