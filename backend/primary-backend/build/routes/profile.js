"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../controllers/profile");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/checkForUsername', profile_1.checkForUsername);
router.post('/updateProfile', auth_1.auth, profile_1.updateProfileDetails);
router.post('/updateSocials', auth_1.auth, profile_1.updateSocials);
router.post('/updaetProfileImage', auth_1.auth, profile_1.updateProfilePicture);
router.post('/getUserByUsername', profile_1.getUserByUsername);
router.post('/updateUsername', auth_1.auth, profile_1.updateUsername);
router.post('/deleteProfile', auth_1.auth, profile_1.deleteProfile);
exports.default = router;
