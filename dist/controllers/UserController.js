"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.register = void 0;
const database_1 = __importDefault(require("../db/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
}
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
// User Registration and Authentication Controller
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield (0, database_1.default)('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const [id] = yield (0, database_1.default)('users').insert({ name, email, password: hashedPassword });
        return res.status(201).json({ message: 'User registered successfully', userId: id });
    }
    catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.register = register;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield (0, database_1.default)('users').where({ id: userId }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ id: user.id, name: user.name, email: user.email });
    }
    catch (error) {
        console.error('Error getUser:', error);
        return res.status(500).json({ message: 'Error server' });
    }
});
exports.getUser = getUser;
// User update controller 
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    try {
        const updatedData = {};
        if (name)
            updatedData.name = name;
        if (email)
            updatedData.email = email;
        if (password)
            updatedData.password = bcrypt_1.default.hashSync(password, 10);
        const updated = yield (0, database_1.default)('users').where({ id: userId }).update(updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'User not found to update' });
        }
        return res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('Error updateUser:', error);
        return res.status(500).json({ message: 'Error server' });
    }
});
exports.updateUser = updateUser;
// Delete user controller
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deleted = yield (0, database_1.default)('users').where({ id: userId }).del();
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleteUser:', error);
        return res.status(500).json({ message: 'Error server' });
    }
});
exports.deleteUser = deleteUser;
