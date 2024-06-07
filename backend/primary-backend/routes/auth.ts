import express from 'express';
import {signup ,login , changePassword , forgotPasswordToken , forgotPassword , sendOTP} from '../controllers/auth'
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', auth, changePassword);
router.post('/forgot-password-token', forgotPasswordToken);
router.post('/forgot-password', forgotPassword);
router.post('/send-otp', sendOTP);

export default router;