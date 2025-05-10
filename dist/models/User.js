"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.email = userData.email;
        this.password = userData.hashed
            ? userData.password
            : this.hashPassword(userData.password);
    }
    hashPassword(password) {
        const salt = bcrypt_1.default.genSaltSync(10);
        return bcrypt_1.default.hashSync(password, salt);
    }
    isPasswordValid(rawPassword) {
        return bcrypt_1.default.compareSync(rawPassword, this.password);
    }
}
exports.User = User;
