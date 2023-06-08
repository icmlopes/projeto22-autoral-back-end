import userService from "@/services/users-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


export async function registerUser(req: Request, res: Response, next: NextFunction){

    const { email, password, confirmPassword } = req.body

    try{

        const user = await userService.createUser({ email, password, confirmPassword });

        return res.status(httpStatus.CREATED).send({
            id: user.id,
            email: user.email
        })

    } catch(error){

        if(error.name === 'differentPasswordError'){
            return res.status(httpStatus.CONFLICT).send(error)
        }

        if(error.name === 'DuplicatedEmailError'){
            return res.status(httpStatus.CONFLICT).send(error)
        }
        return res.status(httpStatus.BAD_REQUEST).send(error)
    }
}
