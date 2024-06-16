import express from 'express';
import { checkForUsername } from '../controllers/profile';

const router = express.Router();

router.post('/check-for-username', checkForUsername);

