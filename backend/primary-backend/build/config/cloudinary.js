"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConnect = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryConnect = () => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }
    catch (error) {
        console.error(error);
        console.log("Can't connect to cloudinary");
    }
};
exports.cloudinaryConnect = cloudinaryConnect;
