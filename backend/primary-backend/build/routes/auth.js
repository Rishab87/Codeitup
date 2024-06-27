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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const router = express_1.default.Router();
router.post('/signup', auth_1.signup);
router.post('/login', auth_1.login);
router.post('/change-password', auth_2.auth, auth_1.changePassword);
router.post('/forgot-password-token', auth_1.forgotPasswordToken);
router.post('/forgot-password', auth_1.forgotPassword);
router.post('/send-otp', auth_1.sendOTP);
router.post('/next-auth', auth_1.nextAuth);
router.post('/cookie-login', auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exists", success: false });
        }
        if (user.token !== req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        return res.status(200).json({ message: "User logged in successfully", data: user, success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
}));
router.post('/expire-cookie', auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true,
        });
        res.status(200).json({ message: "Cookie cleared", success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
}));
exports.default = router;
