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
exports.nextAuth = exports.forgotPassword = exports.forgotPasswordToken = exports.changePassword = exports.login = exports.signup = exports.sendOTP = void 0;
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const redisClient_1 = require("../config/redisClient");
const mailSender_1 = require("../utils/mailSender");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
const setOTP = (email, otp, expirySeconds) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.redisQueueClient.set(email, otp, { EX: 300 });
});
function generateUniqueUsername(firstName) {
    const uniqueId = (0, uuid_1.v4)();
    return `${firstName}_${uniqueId.slice(0, 8)}`;
}
function generateRandomPassword(length = 12) {
    return crypto_1.default.randomBytes(length).toString('base64').slice(0, length);
}
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sendOTPSchema = zod_1.z.object({
            email: zod_1.z.string().email()
        });
        const zodValidation = sendOTPSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error });
        }
        const { email } = req.body;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                email,
            }
        });
        if (user) {
            return res.status(400).json({ message: "User already exists , please login", success: false });
        }
        const otp = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        yield setOTP(email, otp, 300);
        yield (0, mailSender_1.mailSender)(email, "OTP for Codeitup", `Your OTP is ${otp}`);
        return res.status(201).json({ message: "OTP sent successfully", success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false, message: "Internal server error" });
    }
});
exports.sendOTP = sendOTP;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6).refine((password) => {
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSynbol = /[^A-Za-z0-9]/.test(password);
                return hasUpperCase && hasLowerCase && hasNumber && hasSynbol;
            }, {
                message: "Password must contain at least one uppercase ,  one lowercase letter , one number and one symbol."
            }),
            confirmPassword: zod_1.z.string().min(6),
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string(),
            username: zod_1.z.string(),
            otp: zod_1.z.string().length(6),
        });
        const zodValidation = signupSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error, success: false });
        }
        const { email, password, firstName, lastName, username, confirmPassword, otp } = req.body;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                username,
            }
        });
        if (user) {
            return res.status(400).json({ error: "Username already exists", success: false });
        }
        const userByEmail = yield prismaClient_1.default.user.findFirst({
            where: {
                email
            }
        });
        if (confirmPassword !== password) {
            return res.status(400).json({ error: "Password and confirm password do not match", success: false });
        }
        if (userByEmail) {
            return res.status(400).json({ error: "Email already exists", success: false });
        }
        const otpFromRedis = yield redisClient_1.redisQueueClient.get(email);
        if (otpFromRedis !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prismaClient_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                username,
                image: `https://api.dicebear.com/8.x/thumbs/svg?seed=${username}`,
            }
        });
        newUser.password = "undefined";
        return res.status(201).json({ message: "User created successfully", data: newUser, success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6)
        });
        const zodValidation = loginSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error });
        }
        const { email, password } = req.body;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exists" });
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        const date = new Date();
        res.cookie('token', token, { httpOnly: true, expires: new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000), secure: true , sameSite: 'None'});
        user.password = "undefined";
        yield prismaClient_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: token,
            }
        });
        return res.status(200).json({ message: "User logged in successfully", data: user, token, });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changePasswordSchema = zod_1.z.object({
            password: zod_1.z.string().min(6),
            newPassword: zod_1.z.string().min(6).refine((password) => {
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSynbol = /[^A-Za-z0-9]/.test(password);
                return hasUpperCase && hasLowerCase && hasNumber && hasSynbol;
            }, {
                message: "Password must contain at least one uppercase ,  one lowercase letter , one number and one symbol."
            }),
            confirmNewPassword: zod_1.z.string().min(6),
        });
        const zodValidation = changePasswordSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error });
        }
        const { password, newPassword, confirmNewPassword } = req.body;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                id: req.body.userId
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exists" });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Password and confirm password do not match" });
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        if (yield bcrypt_1.default.compare(newPassword, user.password)) {
            return res.status(400).json({ message: "New password cannot be same as old password" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield prismaClient_1.default.user.update({
            where: {
                id: req.body.userId
            },
            data: {
                password: hashedPassword
            }
        });
        return res.status(201).json({ message: "Password changed successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.changePassword = changePassword;
const forgotPasswordToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forgotPasswordTokenSchema = zod_1.z.object({
            email: zod_1.z.string().email()
        });
        const zodValidation = forgotPasswordTokenSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error, success: false });
        }
        const { email } = req.body;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exists" });
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: "5m" });
        yield (0, mailSender_1.mailSender)(email, "Forgot Password", `Click on the link to reset password http://localhost:3000/forgot-password/${token}`);
        return res.status(201).json({ message: "Link sent successfully", success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.forgotPasswordToken = forgotPasswordToken;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forgotPasswordSchema = zod_1.z.object({
            newPassword: zod_1.z.string().min(6).refine((password) => {
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSynbol = /[^A-Za-z0-9]/.test(password);
                return hasUpperCase && hasLowerCase && hasNumber && hasSynbol;
            }, {
                message: "Password must contain at least one uppercase ,  one lowercase letter , one number and one symbol."
            }),
            token: zod_1.z.string(),
            confirmNewPassword: zod_1.z.string().min(6),
        });
        const zodValidation = forgotPasswordSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error, success: false });
        }
        const { newPassword, confirmNewPassword, token } = req.body;
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            return res.status(400).json({ message: "token expired", success: false });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Password and confirm password do not match", success: false });
        }
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                email: decoded.email
            }
        });
        if (yield bcrypt_1.default.compare(newPassword, user.password)) {
            return res.status(400).json({ message: "New password cannot be same as old password", success: false });
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield prismaClient_1.default.user.update({
            where: {
                email: decoded.email
            },
            data: {
                password: hashedPassword
            }
        });
        return res.status(201).json({ message: "Password changed successfully", success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.forgotPassword = forgotPassword;
const nextAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ success: false, message: "Email and name are required" });
        }
        const firstName = name.split(' ')[0];
        const lastName = name.split(' ')[1];
        let user = yield prismaClient_1.default.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            const hashedPassword = yield bcrypt_1.default.hash(generateRandomPassword(), 10);
            user = yield prismaClient_1.default.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    image: `https://api.dicebear.com/8.x/thumbs/svg?seed=${name}`,
                    password: hashedPassword,
                    username: generateUniqueUsername(firstName),
                }
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        const date = new Date();
        res.cookie('token', token, { httpOnly: true, expires: new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000), secure: true , sameSite: "None"});
        user.password = "undefined";
        yield prismaClient_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: token,
            }
        });
        return res.status(200).json({ success: true, message: "User created successfully", data: user, token });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.nextAuth = nextAuth;
