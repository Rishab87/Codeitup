import express from 'express';
import {getQuestionsByPage , getQuestionsByTag , getQuestionsBySearch
     , getQuestionById , createQuestion} from '../controllers/questions';

const router = express.Router();

router.post('/questionsByPage', getQuestionsByPage);
router.get('/tag', getQuestionsByTag);
router.get('/search', getQuestionsBySearch);
router.post('/:id', getQuestionById);
router.post('/create-question', createQuestion); //remove this after adding questions

export default router;