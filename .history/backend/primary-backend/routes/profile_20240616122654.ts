import express from 'express';
import { checkForUsername } from '../controllers/profile';

const router = express.Router();

router.P('/checkForUsername', checkForUsername);

export default router;