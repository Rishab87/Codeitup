"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_1 = require("../controllers/questions");
const router = express_1.default.Router();
router.post('/questionsByPage', questions_1.getQuestionsByPage);
router.post('/filterQuestions', questions_1.getQuestionsByTagDifficultyAndSearch);
router.post('/createQuestion', questions_1.createQuestion); //remove this after adding questions
router.post('/:id', questions_1.getQuestionById);
exports.default = router;
