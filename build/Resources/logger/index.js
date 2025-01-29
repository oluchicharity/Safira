"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const env_1 = __importDefault(require("../constants/env"));
const { createLogger, format, transports } = winston_1.default;
const { combine, timestamp, prettyPrint } = format;
class Logger {
    constructor() {
        this.createLogger = () => {
            return createLogger({
                level: env_1.default.LOG_LEVEL,
                format: combine(timestamp(), prettyPrint(), format.colorize(), format.colorize({ all: true })),
                transports: [new transports.Console()]
            });
        };
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(data) {
        const { message, level, context } = data;
        const logger = this.createLogger();
        logger.log({
            level: level,
            message: message,
            context: context
        });
    }
}
exports.logger = Logger.getInstance();
