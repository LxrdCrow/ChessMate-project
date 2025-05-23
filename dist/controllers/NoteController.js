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
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const database_1 = __importDefault(require("../db/database"));
// Create a new note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { title, content, tags } = req.body;
    try {
        const [id] = yield (0, database_1.default)('notes').insert({
            user_id: userId,
            title,
            content,
            tags: JSON.stringify(tags)
        });
        return res.status(201).json({ message: 'Note saved', noteId: id });
    }
    catch (error) {
        console.error('[createNote] Error:', error);
        return res.status(500).json({ message: 'Server error while saving note' });
    }
});
exports.createNote = createNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const notes = yield (0, database_1.default)('notes').where({ user_id: userId }).select('*');
        notes.forEach(note => {
            note.tags = JSON.parse(note.tags);
        });
        return res.status(200).json(notes);
    }
    catch (error) {
        console.error('[getAllNotes] Error:', error);
        return res.status(500).json({ message: 'Server error while fetching notes' });
    }
});
exports.getAllNotes = getAllNotes;
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const noteId = req.params.id;
    try {
        const note = yield (0, database_1.default)('notes').where({ id: noteId, user_id: userId }).first();
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        note.tags = JSON.parse(note.tags);
        return res.status(200).json(note);
    }
    catch (error) {
        console.error('[getNoteById] Error:', error);
        return res.status(500).json({ message: 'Server error while fetching note' });
    }
});
exports.getNoteById = getNoteById;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const noteId = req.params.id;
    const { title, content, tags } = req.body;
    try {
        const updatedRows = yield (0, database_1.default)('notes')
            .where({ id: noteId, user_id: userId })
            .update({
            title,
            content,
            tags: JSON.stringify(tags)
        });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json({ message: 'Note updated' });
    }
    catch (error) {
        console.error('[updateNote] Error:', error);
        return res.status(500).json({ message: 'Server error while updating note' });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const noteId = req.params.id;
    try {
        const deletedRows = yield (0, database_1.default)('notes')
            .where({ id: noteId, user_id: userId })
            .del();
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json({ message: 'Note deleted' });
    }
    catch (error) {
        console.error('[deleteNote] Error:', error);
        return res.status(500).json({ message: 'Server error while deleting note' });
    }
});
exports.deleteNote = deleteNote;
