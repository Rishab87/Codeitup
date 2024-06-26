import express from 'express';
import {getQuestionsByPage, getQuestionById , createQuestion  , getQuestionsByTagDifficultyAndSearch} from '../controllers/questions';

const router = express.Router();

router.post('/questionsByPage', getQuestionsByPage);
router.post('/filterQuestions' , getQuestionsByTagDifficultyAndSearch);
router.post('/createQuestion',  createQuestion); //remove this after adding questions
router.post('/:id', getQuestionById);

export default router;