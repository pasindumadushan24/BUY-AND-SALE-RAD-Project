"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists",
            });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered",
            user,
        });
    }
    catch (error) {
        console.log("LOGIN ERROR =>", error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        const token = (0, generateToken_1.default)(user._id.toString());
        res.status(200).json({
            token,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.login = login;
