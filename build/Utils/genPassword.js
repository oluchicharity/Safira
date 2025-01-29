"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
const generatePassword = () => {
    const prefix = "SAF-IRA@";
    const randomPart = Math.random().toString(36).slice(-6).toUpperCase();
    return `${prefix}${randomPart}`;
};
exports.generatePassword = generatePassword;
