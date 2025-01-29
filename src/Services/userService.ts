import User, { IUser } from '../Models/userModel';
import { hashPassword } from '../Utils/hashPassword';
import { generatePassword } from '../Utils/generatePassword';
import { HttpException } from '../Errors/HttpException';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../Resources/constants/status-codes';

class UserService {
    private static instance: UserService;
  
    public static getInstance(): UserService {
      if (!UserService.instance) {
        UserService.instance = new UserService();
      }
      return UserService.instance;
    }

 async registerUser(data: { fullname: string; email: string; }) {

 try{

 const { fullname, email } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HttpException(BAD_REQUEST, "SAFIRA user already exists.")
  }

  const generatedPassword = generatePassword();

  const passwordHash = await hashPassword(generatedPassword);

  const newUser: IUser = new User({
    fullname,
    email,
    passwordHash,
  });

  await newUser.save();

  return {
    id: newUser._id,
    fullname: newUser.fullname,
    email: newUser.email,
    password: generatedPassword, 
  };
} catch (error) {
    throw new HttpException(
        INTERNAL_SERVER_ERROR,
        "Error adding this SAFIRA user: ${error.message}")
  }
};
}

export const userService = UserService.getInstance();