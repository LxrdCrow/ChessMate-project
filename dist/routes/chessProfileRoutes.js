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
const ChessProfileController_1 = require("../controllers/ChessProfileController");
const router = (0, express_1.Router)();
router.get('/chess-profile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    if (!username || typeof username !== 'string') {
        res.status(400).json({ error: 'Username is required and must be a string.' });
        return;
    }
    try {
        yield (0, ChessProfileController_1.getProfile)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
