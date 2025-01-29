"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignInSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string().email({ message: 'Invalid email address' });
const fullnameSchema = zod_1.z.string().min(1, { message: 'Full name is required' });
exports.UserSignInSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: emailSchema,
        fullname: fullnameSchema,
    }),
});
