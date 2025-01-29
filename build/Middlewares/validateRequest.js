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
exports.ValidateRequest = void 0;
const status_codes_1 = require("../Resources/constants/status-codes");
const ValidateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        catch (error) {
            res.status(status_codes_1.BAD_REQUEST).json({ error: error.message });
            return;
        }
    });
};
exports.ValidateRequest = ValidateRequest;
