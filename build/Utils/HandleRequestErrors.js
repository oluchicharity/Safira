"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUnknownError = exports.handleRequestError = void 0;
const HttpException_1 = require("./HttpException");
const status_codes_1 = require("../Resources/constants/status-codes");
const index_1 = require("../Resources/logger/index");
const axios_1 = require("axios");
const isDefaultError = (error) => {
    return error instanceof Error;
};
const handleRequestError = (error, response, logOnly) => {
    const parsedError = parseUnknownError(error);
    const requestUrl = response.req.originalUrl;
    const _logger = index_1.logger.createLogger();
    _logger.error(parsedError.message, Object.assign(Object.assign({}, parsedError), { requestUrl }));
    if (logOnly) {
        return;
    }
    return response
        .status(parsedError.statusCode)
        .send({ message: parsedError.message });
};
exports.handleRequestError = handleRequestError;
const parseUnknownError = (error) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const parsedError = {
        message: "",
        name: "",
        statusCode: status_codes_1.INTERNAL_SERVER_ERROR,
    };
    if ((0, axios_1.isAxiosError)(error)) {
        parsedError["data"] = {
            errorResponse: (_a = error.response) === null || _a === void 0 ? void 0 : _a.data,
            requestConfig: {
                data: (_b = error.config) === null || _b === void 0 ? void 0 : _b.data,
                url: (_c = error.config) === null || _c === void 0 ? void 0 : _c.url,
                baseURL: (_d = error.config) === null || _d === void 0 ? void 0 : _d.baseURL,
                method: (_e = error.config) === null || _e === void 0 ? void 0 : _e.method,
                params: (_f = error.config) === null || _f === void 0 ? void 0 : _f.params,
                headers: (_g = error.config) === null || _g === void 0 ? void 0 : _g.headers,
            },
        };
        parsedError["cause"] = error.cause;
        parsedError["statusCode"] =
            (_k = (_j = (_h = error.response) === null || _h === void 0 ? void 0 : _h.status) !== null && _j !== void 0 ? _j : error.status) !== null && _k !== void 0 ? _k : status_codes_1.INTERNAL_SERVER_ERROR;
        parsedError["message"] = error.message;
        parsedError["code"] = error.code;
        parsedError["stack"] = error.stack;
        parsedError["name"] = error.name;
        return parsedError;
    }
    else if ((0, HttpException_1.isHttpError)(error)) {
        parsedError["message"] = error.message;
        parsedError["statusCode"] = error.status;
        parsedError["stack"] = error.stack;
        parsedError["data"] = error.data;
        parsedError["code"] = "ERR_HTTP_REQUEST_ERROR";
        parsedError["name"] = error.name;
        return parsedError;
    }
    else if (isDefaultError(error)) {
        parsedError["message"] = error.message;
        parsedError["statusCode"] = status_codes_1.INTERNAL_SERVER_ERROR;
        parsedError["stack"] = error.stack;
        parsedError["data"] = "";
        parsedError["code"] = "ERR_HTTP_REQUEST_ERROR";
        parsedError["name"] = error.name;
        return parsedError;
    }
    else {
        parsedError["message"] =
            (_l = error.message) !== null && _l !== void 0 ? _l : "An unknown error occurred";
        parsedError["statusCode"] = status_codes_1.INTERNAL_SERVER_ERROR;
        parsedError["code"] = "ERR_UNKNOWN_ERROR";
        parsedError["stack"] = error.stack;
        parsedError["name"] = error.name;
        return parsedError;
    }
};
exports.parseUnknownError = parseUnknownError;
