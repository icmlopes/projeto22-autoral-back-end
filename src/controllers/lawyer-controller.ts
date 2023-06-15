import { AuthenticatedRequest } from './../middlewares/authentication-middleware';
import lawyerService from "@/services/lawyer-service"
import { NextFunction, Response } from "express"
import httpStatus from "http-status"

export default async function enrollLawyer(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId  = req.userId;

    const { name, oab, state } = req.body;

    try {

      const newLawyer = await lawyerService.createNewLawyer(name, userId, oab, state);
  
      return res.status(httpStatus.CREATED).send({
        id: newLawyer.id,
        name: newLawyer.name,
        userId: newLawyer.userId,
        barNumberId: newLawyer.barNumberId,
      });
    } catch (err) {
      return res.status(httpStatus.BAD_REQUEST).send(err.message || "Erro ao cadastrar advogado");
    }
  }