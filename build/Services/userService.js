"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const hashPassword_1 = require("../Utils/hashPassword");
const generatePassword_1 = require("../Utils/generatePassword");
const HttpException_1 = require("../Errors/HttpException");
const status_codes_1 = require("../Resources/constants/status-codes");
class UserService {
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullname, email } = data;
                const existingUser = yield userModel_1.default.findOne({ email });
                if (existingUser) {
                    throw new HttpException_1.HttpException(status_codes_1.BAD_REQUEST, "SAFIRA user already exists.");
                }
                const generatedPassword = (0, generatePassword_1.generatePassword)();
                const passwordHash = yield (0, hashPassword_1.hashPassword)(generatedPassword);
                const newUser = new userModel_1.default({
                    fullname,
                    email,
                    passwordHash,
                });
                yield newUser.save();
                return {
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    password: generatedPassword,
                };
            }
            catch (error) {
                throw new HttpException_1.HttpException(status_codes_1.INTERNAL_SERVER_ERROR, "Error adding this SAFIRA user: ${error.message}");
            }
        });
    }
    ;
}
exports.userService = UserService.getInstance();
