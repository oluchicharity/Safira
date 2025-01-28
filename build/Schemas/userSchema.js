"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegistrationSchema = void 0;
const zod_1 = require("zod");
// Schema for user registration
exports.userRegistrationSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
// Schema for user login
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
