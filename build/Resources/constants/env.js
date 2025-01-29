"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nonEmptyString = (variableName) => zod_1.z.string().min(1, `Please set the ${variableName} environment variable in your .env file`);
const envSchema = zod_1.z.object({
    APP_ENV: zod_1.z.enum(['development', 'production']).default('development'),
    LOG_LEVEL: zod_1.z.enum(['info', 'warn', 'error']).default('info'),
});
const env = envSchema.parse(process.env);
exports.default = env;
