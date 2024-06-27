"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const problemSubmission_1 = require("../controllers/problemSubmission");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/submit-problem', auth_1.auth, problemSubmission_1.submitProblem);
router.post('/get-user-submissions-by-question', auth_1.auth, problemSubmission_1.getUserSubmissionsByQuestion);
exports.default = router;
