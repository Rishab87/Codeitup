import express from 'express';
import { checkForUsername } from '../controllers/profile';

const router = express.Router();

router.get('/check-for-username', checkForUsername);

export default router;