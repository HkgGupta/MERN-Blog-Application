import express from 'express';
import { userDelete, userDetails, userLogin, userRegister } from '../controllers/user.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/details', userDetails);
router.delete('/delete', userDelete);
export default router;