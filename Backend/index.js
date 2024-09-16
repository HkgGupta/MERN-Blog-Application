import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    dbConnect();
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API Route Error for GET ' + req.originalUrl,
    });
});