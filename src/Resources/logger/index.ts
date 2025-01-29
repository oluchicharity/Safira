import winston, { level } from "winston";
import env from "../constants/env";
const { createLogger, format, transports } = winston;
const { combine, timestamp, prettyPrint } = format;

type levels = 'info' | 'error' | 'warn';

class Logger {
    private static instance: Logger;

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public createLogger = () => {
        return createLogger({
            level: env.LOG_LEVEL,
            format: combine(
                timestamp(),
                prettyPrint(),
                format.colorize(),
                format.colorize({ all: true })
            ),
            transports: [new transports.Console()]
        });
    }

    public log(data: { message: string; level: levels; context?: {} }): void {
        const { message, level, context } = data;
        const logger = this.createLogger();
        logger.log({
            level: level,
            message: message,
            context: context
        });
    }
}

export const logger = Logger.getInstance();