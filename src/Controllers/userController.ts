import { Request, Response } from "express";
import { userService } from "../Services/userService";
import { OK } from "../Resources/constants/status-codes";
import { handleRequestError } from "../Errors/HandleRequestErrors";
import { UserSignInSchemaBody } from "../Schemas/userSchemas";

class UserController {
  private static instance: UserController;

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async createUser(req: RequestWithBody<UserSignInSchemaBody>, res: Response) {
    const { fullname, email } = req.body;

    try {
      const data = await userService.registerUser({ fullname, email });

      return res.status(OK).send({
        message: "Admin account created",
        data: {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
        console.error("Error in createUser:", error); 
        handleRequestError(error, res);
    }
    
  }
}

export const userController = UserController.getInstance();
