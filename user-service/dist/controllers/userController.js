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
exports.logout = exports.login = exports.register = void 0;
const ormconfig_1 = require("../config/ormconfig");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Hash Password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Get Repository (Ensures TypeORM is initialized)
        const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
        // Check if user already exists
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }
        // Create & Save User
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        yield userRepository.save(user);
        logger_1.logger.info("User Created Successfully");
        res.status(201).json({
            message: "User Registered Successfully",
            data: { id: user.id, name: user.name, email: user.email },
        });
        return;
    }
    catch (err) {
        logger_1.logger.error("Error while creating User", err);
        res.status(500).json({ message: "Internal Server Error", err });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Get Repository
        const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
        // Find User
        const user = yield userRepository.findOne({ where: { email } });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            logger_1.logger.error("Invalid Credentials");
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
        });
        res.json({ name: user.name, email: user.email, token });
    }
    catch (err) {
        logger_1.logger.error("Internal Server Error");
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Frontend should handle token removal; backend can use a blacklist approach
        res.status(200).json({
            message: "User Logged Out (Token should be removed on client side)",
        });
        return;
    }
    catch (err) {
        logger_1.logger.error("Error while logout");
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.logout = logout;
