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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../Services/userService");
const status_codes_1 = require("../Resources/constants/status-codes");
const HandleRequestErrors_1 = require("../Errors/HandleRequestErrors");
class UserController {
    static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, email } = req.body;
            try {
                const data = yield userService_1.userService.registerUser({ fullname, email });
                return res.status(status_codes_1.OK).send({
                    message: "Admin account created",
                    data: {
                        fullname: data.fullname,
                        email: data.email,
                        password: data.password,
                    },
                });
            }
            catch (error) {
                console.error("Error in createUser:", error);
                (0, HandleRequestErrors_1.handleRequestError)(error, res);
            }
        });
    }
}
exports.userController = UserController.getInstance();
