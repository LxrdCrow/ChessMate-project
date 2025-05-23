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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.register)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:id', auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.getUser)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.put('/:id', auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.updateUser)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:id', auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.deleteUser)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
console.log(auth_1.verifyToken);
