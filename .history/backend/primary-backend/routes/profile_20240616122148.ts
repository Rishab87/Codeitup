import express from 'express';
import { checkForUsername } from '../controllers/profile';

const router = express.Router();

router.get('/checkForUsername', checkForUsername);

export default router;