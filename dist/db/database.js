"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'tua_password',
        database: 'chessmate',
        port: 3306,
    },
    pool: { min: 0, max: 7 },
});
exports.default = db;
