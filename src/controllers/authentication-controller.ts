import authenticationService, { SignInParams } from "@/services/authentication-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";



export async function login(req: Request, res: Response, next: NextFunction){

    const { email, password } = req.body as SignInParams

    try{

        const result = await authenticationService.signIn({email, password})

        console.log(result)

        return res.status(httpStatus.OK).send(result)

    } catch(error){

        return res.status(httpStatus.UNAUTHORIZED).send({})
    }
}