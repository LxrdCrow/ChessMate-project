import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';
import chessProfileRoutes from './routes/chessProfileRoutes';
import  chessGameRoutes  from './routes/chessGameRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api', chessProfileRoutes); 
app.use('/api/games', chessGameRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('ChessMate API is running 🏁');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
