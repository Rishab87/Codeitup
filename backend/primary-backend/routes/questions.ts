import express from 'express';
import {getQuestionsByPage, getQuestionById , createQuestion  , getQuestionsByTagDifficultyAndSearch} from '../controllers/questions';

const router = express.Router();

router.post('/questionsByPage', getQuestionsByPage);
router.post('/filterQuestions' , getQuestionsByTagDifficultyAndSearch);
router.post('/:id', getQuestionById);
router.post('/create-question', createQuestion); //remove this after adding questions

export default router;