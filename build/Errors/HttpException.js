"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHttpError = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message, data = '') {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.HttpException = HttpException;
const isHttpError = (error) => {
    return (error.status !== undefined &&
        error.message !== undefined);
};
exports.isHttpError = isHttpError;
