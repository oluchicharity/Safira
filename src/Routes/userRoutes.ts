import { Router } from "express";
import { userController } from "../Controllers/userController"; 
import { ValidateRequest } from "../Middlewares/validateRequest";
import { UserSignInSchema } from "../Schemas/userSchemas";

const userRouter = Router();

userRouter.post(
  "/register",
  ValidateRequest(UserSignInSchema),
  async (req, res) => {
    await userController.createUser(req, res);
  }
);

export default userRouter;
