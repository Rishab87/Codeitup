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
exports.deleteProfile = exports.updateUsername = exports.getUserByUsername = exports.updateSocials = exports.updateProfileDetails = exports.updateProfilePicture = exports.checkForUsername = void 0;
//edit additionalProfileInfo like skills , image , education etc
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const imageUploader_1 = require("../utils/imageUploader");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkForUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkForUsernameSchema = zod_1.z.object({
            username: zod_1.z.string()
        });
        const zodValidation = checkForUsernameSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error, success: false, });
        }
        const { username } = req.body;
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                username
            }
        });
        if (user) {
            return res.status(200).json({ message: "Username already exists", success: false });
        }
        return res.status(200).json({ message: "Username is available", success: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.checkForUsername = checkForUsername;
const updateProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.files.profileImage;
        const { userId } = req.body;
        //upload to cloudinary
        const cloudImage = yield (0, imageUploader_1.uploadImageToCloudinary)(image, process.env.FOLDER_NAME);
        //delete old cloudinary image
        //update in DB
        const user = yield prismaClient_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                image: cloudImage.secure_url,
            }
        });
        return res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.updateProfilePicture = updateProfilePicture;
const updateProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                id: userId,
            }
        });
        const zodSchema = zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            skills: zod_1.z.array(zod_1.z.string()).optional(),
            bio: zod_1.z.string().optional(),
        });
        const zodValidation = zodSchema.safeParse(req.body);
        if (!zodValidation.success) {
            return res.status(400).json({ error: zodValidation.error, success: false, });
        }
        const { firstName = user === null || user === void 0 ? void 0 : user.firstName, lastName = user === null || user === void 0 ? void 0 : user.lastName, skills = user === null || user === void 0 ? void 0 : user.skills, bio = user === null || user === void 0 ? void 0 : user.bio } = req.body;
        const updatedUser = yield prismaClient_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName,
                lastName,
                skills,
                bio,
            }
        });
        return res.status(200).json({ success: true, data: updatedUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.updateProfileDetails = updateProfileDetails;
const updateSocials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                id: userId,
            }
        });
        const socialsSchema = zod_1.z.object({
            youtube: zod_1.z
                .string()
                .regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[\w-]+$/, { message: 'Invalid YouTube URL' })
                .optional(),
            github: zod_1.z
                .string()
                .regex(/^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/?$/, { message: 'Invalid GitHub URL' })
                .optional(),
            linkedin: zod_1.z
                .string()
                .regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/, { message: 'Invalid LinkedIn URL' })
                .optional(),
            portfolio: zod_1.z
                .string()
                .regex(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/, { message: 'Invalid Portfolio URL' })
                .optional(),
        });
        const socialsValidation = socialsSchema.safeParse(req.body);
        if (!socialsValidation.success) {
            return res.status(400).json({ error: socialsValidation.error, success: false, });
        }
        const { socials = user === null || user === void 0 ? void 0 : user.socials } = req.body;
        const updatedUser = yield prismaClient_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                socials,
            }
        });
        return res.status(200).json({ success: true, data: updatedUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.updateSocials = updateSocials;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        if (!username)
            return res.status(400).json({ message: "Username is required", success: false });
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                username
            }
        });
        if (!user)
            return res.status(404).json({ message: "User not found", success: false });
        return res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.getUserByUsername = getUserByUsername;
const updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const { userId } = req.body;
        const checkUsername = yield prismaClient_1.default.user.findFirst({
            where: {
                username
            }
        });
        if (checkUsername) {
            return res.status(400).json({ message: "Username already exists", success: false });
        }
        const updatedUser = yield prismaClient_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                username
            }
        });
        return res.status(200).json({ success: true, data: updatedUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.updateUsername = updateUsername;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield prismaClient_1.default.user.delete({
            where: {
                id: userId,
            }
        });
        return res.status(200).json({ success: true, message: "User deleted successfully", data: user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
});
exports.deleteProfile = deleteProfile;
