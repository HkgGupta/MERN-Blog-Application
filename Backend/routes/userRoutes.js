import express from 'express';
import { userDelete, userDetails, userLogin, userRegister, userVerify, userUpdatePassword, userUpdateProfile } from '../controllers/user.js';
import { userAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);
router.post('/user-verify', userAuth, userVerify);
router.get('/user-details', userAuth, userDetails);
router.delete('/user-delete', userAuth, userDelete);
router.post('/user-update-profile', userAuth, userUpdateProfile);
router.post('/user-update-password', userAuth, userUpdatePassword);


export default router;