
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();


const nonEmptyString = (variableName: string) =>
    z.string().min(1, `Please set the ${variableName} environment variable in your .env file`);

const envSchema = z.object({
    APP_ENV: z.enum(['development', 'production']).default('development'),
    LOG_LEVEL: z.enum(['info', 'warn', 'error']).default('info'),
})


const env = envSchema.parse(process.env);
export default env;