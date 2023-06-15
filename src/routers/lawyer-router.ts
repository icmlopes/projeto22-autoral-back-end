import enrollLawyer from "@/controllers/lawyer-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createLawyerchema } from "@/schemas/lawyer-schema";
import { Router } from "express";

const lawyerRouter = Router()


lawyerRouter.all('*', authenticateToken);
lawyerRouter.post('/lawyer',validateBody(createLawyerchema), enrollLawyer);

export { lawyerRouter }