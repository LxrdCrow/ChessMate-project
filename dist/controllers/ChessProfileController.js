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
exports.deleteProfile = exports.updateProfile = exports.getProfile = exports.createProfile = void 0;
const database_1 = __importDefault(require("../db/database"));
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { preferred_openings, rating, notes } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const existingProfile = yield (0, database_1.default)('chess_profiles').where({ user_id: userId }).first();
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        const [id] = yield (0, database_1.default)('chess_profiles').insert({
            user_id: userId,
            preferred_openings: JSON.stringify(preferred_openings),
            rating,
            notes,
        });
        return res.status(201).json({ message: 'Profile created', profileId: id });
    }
    catch (error) {
        console.error('Error createProfile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.createProfile = createProfile;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const profile = yield (0, database_1.default)('chess_profiles').where({ user_id: userId }).first();
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        profile.preferred_openings = JSON.parse(profile.preferred_openings);
        return res.status(200).json(profile);
    }
    catch (error) {
        console.error('Error getProfile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { preferred_openings, rating, notes } = req.body;
    try {
        const updatedData = {};
        if (preferred_openings)
            updatedData.preferred_openings = JSON.stringify(preferred_openings);
        if (rating !== undefined)
            updatedData.rating = rating;
        if (notes !== undefined)
            updatedData.notes = notes;
        const updated = yield (0, database_1.default)('chess_profiles').where({ user_id: userId }).update(updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'Profile not found to update' });
        }
        return res.status(200).json({ message: 'Profile updated' });
    }
    catch (error) {
        console.error('Error updateProfile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const deleted = yield (0, database_1.default)('chess_profiles').where({ user_id: userId }).del();
        if (!deleted) {
            return res.status(404).json({ message: 'Profile not found to delete' });
        }
        return res.status(200).json({ message: 'Profile deleted' });
    }
    catch (error) {
        console.error('Error deleteProfile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteProfile = deleteProfile;
