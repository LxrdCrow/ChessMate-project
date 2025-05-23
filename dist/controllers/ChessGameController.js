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
exports.deleteGame = exports.updateGame = exports.getGameById = exports.getAllGames = exports.createGame = void 0;
const database_1 = __importDefault(require("../db/database"));
// Create a new chess game
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { opponent, color, opening, result, date, tags, comments } = req.body;
    try {
        const [id] = yield (0, database_1.default)('chess_games').insert({
            user_id: userId,
            opponent,
            color,
            opening,
            result,
            date,
            tags: JSON.stringify(tags),
            comments
        });
        return res.status(201).json({ message: 'Game saved', gameId: id });
    }
    catch (error) {
        console.error('[createGame] Error:', error);
        return res.status(500).json({ message: 'Server error while saving game' });
    }
});
exports.createGame = createGame;
const getAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const games = yield (0, database_1.default)('chess_games').where({ user_id: userId }).select('*');
        games.forEach(game => {
            game.tags = JSON.parse(game.tags);
        });
        return res.status(200).json(games);
    }
    catch (error) {
        console.error('[getAllGames] Error:', error);
        return res.status(500).json({ message: 'Server error while fetching games' });
    }
});
exports.getAllGames = getAllGames;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const gameId = parseInt(req.params.id);
    try {
        const game = yield (0, database_1.default)('chess_games').where({ id: gameId, user_id: userId }).first();
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        game.tags = JSON.parse(game.tags);
        return res.status(200).json(game);
    }
    catch (error) {
        console.error('[getGameById] Error:', error);
        return res.status(500).json({ message: 'Server error while retrieving game' });
    }
});
exports.getGameById = getGameById;
// Update a chess game
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const gameId = parseInt(req.params.id);
    const { opponent, color, opening, result, date, tags, comments } = req.body;
    try {
        const updatedData = {};
        if (opponent)
            updatedData.opponent = opponent;
        if (color)
            updatedData.color = color;
        if (opening)
            updatedData.opening = opening;
        if (result)
            updatedData.result = result;
        if (date)
            updatedData.date = date;
        if (tags)
            updatedData.tags = JSON.stringify(tags);
        if (comments)
            updatedData.comments = comments;
        const updated = yield (0, database_1.default)('chess_games')
            .where({ id: gameId, user_id: userId })
            .update(updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'Game not found to update' });
        }
        return res.status(200).json({ message: 'Game updated' });
    }
    catch (error) {
        console.error('[updateGame] Error:', error);
        return res.status(500).json({ message: 'Server error while updating game' });
    }
});
exports.updateGame = updateGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const gameId = parseInt(req.params.id);
    try {
        const deleted = yield (0, database_1.default)('chess_games')
            .where({ id: gameId, user_id: userId })
            .del();
        if (!deleted) {
            return res.status(404).json({ message: 'Game not found to delete' });
        }
        return res.status(200).json({ message: 'Game deleted' });
    }
    catch (error) {
        console.error('[deleteGame] Error:', error);
        return res.status(500).json({ message: 'Server error while deleting game' });
    }
});
exports.deleteGame = deleteGame;
