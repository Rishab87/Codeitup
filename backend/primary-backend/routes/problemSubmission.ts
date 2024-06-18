import express from 'express';
import {submitProblem} from '../controllers/problemSubmission';
import {auth} from '../middlewares/auth';

const router = express.Router();

router.post('/submit-problem', auth , submitProblem);

export default router;