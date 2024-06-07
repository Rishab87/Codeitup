import express from 'express';
import {getQuestionsByPage , getQuestionsByTag , getQuestionsBySearch
     , getQuestionById , createQuestion} from '../controllers/questions';

const router = express.Router();

router.get('/questions', getQuestionsByPage);
router.get('/questions/tag', getQuestionsByTag);
router.get('/questions/search', getQuestionsBySearch);
router.get('/questions/:id', getQuestionById);
router.post('/create-question', createQuestion); //remove this after adding questions

export default router;