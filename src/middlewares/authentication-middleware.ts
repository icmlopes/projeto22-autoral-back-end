import { prisma } from "@/config/database";
import { unauthorizedError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';


export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const authHeader = req.header('Authorization')

    if(!authHeader) throw unauthorizedError();

    const token = authHeader.split(' ')[1];

    if(!token) throw unauthorizedError()

    try{

        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
        
        const session = await prisma.session.findFirst({
            where: {
                token,
            }
        })
        if(!session) throw unauthorizedError()

        req.userId = userId;

        return next()

    } catch(error){
        next(error)
    }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
