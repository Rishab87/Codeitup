"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSubmissionsByQuestion = exports.submitProblem = void 0;
const redisClient_1 = require("../config/redisClient");
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
//exec run code with two test cases and return the result
const submitProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, redisClient_1.isRedisConnected)()) {
            return res.status(500).json({ error: "Redis not connected", message: "Something went wrong  , Please try again later" });
        }
        const submitProblemSchema = zod_1.z.object({
            questionId: zod_1.z.string(),
            code: zod_1.z.string(),
            language: zod_1.z.string(),
            userCode: zod_1.z.string(),
        });
        const zodValidation = submitProblemSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error });
        }
        const { questionId, code, language, userCode } = req.body;
        const { userId } = req.body;
        const question = yield prismaClient_1.default.question.findFirst({
            where: {
                id: questionId
            }
        });
        const problemSubmission = {
            questionId,
            code,
            language,
            userId,
            testCases: question === null || question === void 0 ? void 0 : question.testCases,
            config: question === null || question === void 0 ? void 0 : question.config,
            minTime: question === null || question === void 0 ? void 0 : question.minTime,
            difficulty: question === null || question === void 0 ? void 0 : question.difficulty,
            userCode
        };
        yield redisClient_1.redisQueueClient.lPush("submissions", JSON.stringify(problemSubmission));
        res.json({
            message: "Problem submitted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.submitProblem = submitProblem;
const getUserSubmissionsByQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId, userId } = req.body;
        if (!questionId || !userId) {
            return res.status(400).json({ message: "Question id and user id is required" });
        }
        const submissions = yield prismaClient_1.default.submissions.findMany({
            where: {
                questionId,
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        return res.status(200).json({ data: submissions, success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.getUserSubmissionsByQuestion = getUserSubmissionsByQuestion;
