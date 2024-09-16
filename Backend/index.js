import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import { dbConnect } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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