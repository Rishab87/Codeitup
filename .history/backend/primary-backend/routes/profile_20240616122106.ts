import express from 'express';
import { checkForUsername } from '../controllers/profile';

const router = express.Router();

router.get('/checkForusername', checkForUsername);

export default router;