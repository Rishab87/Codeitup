import express from 'express';
import { checkForUsername } from '../controllers/profile';

const router = express.Router();

router.post('/checkForUsername', checkForUsername);

export default router;