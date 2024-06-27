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
exports.submitUsQuestionIdea = exports.createQuestion = exports.getQuestionById = exports.getQuestionsByTagDifficultyAndSearch = exports.getQuestionsByPage = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const zod_1 = require("zod");
const getQuestionsByPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.body;
        if (!page)
            return res.status(400).json({ message: "Page number is required", success: false });
        const pageSize = 50;
        const skip = (parseInt(page) - 1) * pageSize;
        const questions = yield prismaClient_1.default.question.findMany({
            skip,
            take: pageSize,
            orderBy: {
                createdAt: 'asc',
            }
        });
        if (!questions)
            return res.status(404).json({ message: "No questions found" });
        return res.status(201).json({ data: questions });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getQuestionsByPage = getQuestionsByPage;
const getQuestionsByTagDifficultyAndSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, tag, difficulty } = req.body;
        const where = {};
        if (search !== "") {
            where.title = {
                contains: search,
                mode: "insensitive"
            };
        }
        if (tag !== "") {
            where.tags = {
                some: {
                    name: {
                        in: [tag]
                    }
                }
            };
        }
        if (difficulty !== "") {
            where.difficulty = difficulty;
        }
        const questions = yield prismaClient_1.default.question.findMany({
            where,
            include: {
                tags: true
            }
        });
        ;
        return res.status(200).json({ success: true, data: questions });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.getQuestionsByTagDifficultyAndSearch = getQuestionsByTagDifficultyAndSearch;
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "Question id is required" });
        const question = yield prismaClient_1.default.question.findFirst({
            where: {
                id
            },
            include: {
                tags: true
            }
        });
        if (!question)
            return res.status(404).json({ message: "Question not found" });
        return res.status(201).json({ data: question });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getQuestionById = getQuestionById;
//for admin in future
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = zod_1.z.object({
            title: zod_1.z.string().min(1),
            description: zod_1.z.string().min(1),
            difficulty: zod_1.z.string().min(1),
            tags: zod_1.z.array(zod_1.z.string()),
            minTime: zod_1.z.number(),
            examples: zod_1.z.array(zod_1.z.object({
                input: zod_1.z.string(),
                output: zod_1.z.string()
            })),
            constraints: zod_1.z.array(zod_1.z.string().min(1)),
            testCases: zod_1.z.array(zod_1.z.object({
                input: zod_1.z.string(),
                output: zod_1.z.string(),
            })),
            config: zod_1.z.object({
                cpp: zod_1.z.object({
                    userCode: zod_1.z.string().min(1),
                    executionCode: zod_1.z.string().min(1),
                }),
                javascript: zod_1.z.object({
                    userCode: zod_1.z.string().min(1),
                    executionCode: zod_1.z.string().min(1),
                }),
                python: zod_1.z.object({
                    userCode: zod_1.z.string().min(1),
                    executionCode: zod_1.z.string().min(1),
                }),
            }),
        });
        const zodValidation = schema.safeParse(req.body);
        if (zodValidation.success === false)
            return res.status(400).json({ message: "Invalid data" });
        const { title, description, difficulty, tags, config, minTime, examples, constraints, testCases } = req.body;
        const tagsConnectOrCreate = tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag }
        }));
        const question = yield prismaClient_1.default.question.create({
            data: {
                title,
                description,
                difficulty,
                config: config,
                minTime,
                examples: examples,
                constraints,
                testCases: testCases,
                tags: {
                    connectOrCreate: tagsConnectOrCreate
                }
            }
        });
        return res.status(201).json({ data: question });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createQuestion = createQuestion;
const submitUsQuestionIdea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.submitUsQuestionIdea = submitUsQuestionIdea;
