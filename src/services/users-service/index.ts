import { differentPasswordError, duplicatedEmailError } from "@/errors";
import { UserRegister } from "@/protocols";
import userRepository from "@/repositories/users-repository";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';

export async function createUser({ email, password, confirmPassword, userType }: UserRegister): Promise<User>{

    if(password !== confirmPassword){
        throw differentPasswordError()
    }

    await validateUniqueEmail(email)

    const hashedPassword = await bcrypt.hash(password, 12)

    return userRepository.createUser({
        email,
        password: hashedPassword,
        userType: userType,
    })
}

async function validateUniqueEmail(email: string){
    const sameEmail = await userRepository.findByEmail(email)
    if(sameEmail){
        throw duplicatedEmailError()
    }
}

const userService = {
    createUser,
}

export default userService;