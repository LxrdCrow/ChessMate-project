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
const ChessGameController_1 = require("../controllers/ChessGameController");
const router = (0, express_1.Router)();
router.post('/chess-games', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, ChessGameController_1.createGame)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.put('/chess-games/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, ChessGameController_1.updateGame)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/chess-games/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, ChessGameController_1.deleteGame)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
