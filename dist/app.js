"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chessProfileRoutes_1 = __importDefault(require("./routes/chessProfileRoutes"));
const chessGameRoutes_1 = __importDefault(require("./routes/chessGameRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/users', userRoutes_1.default);
app.use('/api', chessProfileRoutes_1.default);
app.use('/api/games', chessGameRoutes_1.default);
app.use('/api/notes', noteRoutes_1.default);
app.get('/', (req, res) => {
    res.send('ChessMate API is running 🏁');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
exports.default = app;
