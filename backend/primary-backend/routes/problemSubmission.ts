import express from 'express';
import {submitProblem , getUserSubmissionsByQuestion} from '../controllers/problemSubmission';
import {auth} from '../middlewares/auth';

const router = express.Router();

router.post('/submit-problem', auth , submitProblem);
router.post('/get-user-submissions-by-question', auth , getUserSubmissionsByQuestion);

export default router;