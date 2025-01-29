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
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const validateRequest_1 = require("../Middlewares/validateRequest");
const userSchemas_1 = require("../Schemas/userSchemas");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", (0, validateRequest_1.ValidateRequest)(userSchemas_1.UserSignInSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.userController.createUser(req, res);
}));
exports.default = userRouter;
