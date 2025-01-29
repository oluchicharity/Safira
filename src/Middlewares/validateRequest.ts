
import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";
import { BAD_REQUEST } from "../Resources/constants/status-codes";

export const ValidateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        body: req.body,
         query: req.query,
         params: req.params,
      });

      if (!result.success) {
        const errorMessage = result.error.errors[0].message;
        throw new Error(errorMessage);
      }
      next();

    } catch (error) {
        res.status(BAD_REQUEST).json({ error: (error as Error).message });
        return;
    }
  };
}