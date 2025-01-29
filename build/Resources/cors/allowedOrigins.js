"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOriginPatterns = void 0;
const allowedOrigins = [
    'http://localhost:2001',
    ,
    // Add frontend url
];
exports.allowedOriginPatterns = [
    //add frontend url regex
    /^http:\/\/localhost:(\d)+$/,
    /.+\.local$/,
    // Add other patterns as needed
];
exports.default = allowedOrigins;
