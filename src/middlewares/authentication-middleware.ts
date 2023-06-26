import { prisma } from "@/config/database";
import { unauthorizedError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from 'jsonwebtoken';


export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const authHeader = req.header('Authorization')

    if(!authHeader) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    };

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    };

    try{

        // const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number }
        
        const session = await prisma.session.findFirst({
            where: {
                token,
            }
        })
        if(!session){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        };

        req.userId = decodedToken.userId;

        return next()

    } catch(error){
        next(error)
    }
}
       
export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
