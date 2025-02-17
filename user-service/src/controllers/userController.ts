// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
} from "shared-constants";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get Repository (Ensures TypeORM is initialized)
    const userRepository = AppDataSource.getRepository(User);
    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        httpResponse: HttpResponseMessages.BAD_REQUEST,
        message: "Email already in use",
      });
      return;
    }

    // Create & Save User
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    logger.info("User Created Successfully");
    res.status(HttpStatusCodes.CREATED).json({
      statusCode: HttpStatusCodes.CREATED,
      httpResponse: HttpResponseMessages.CREATED,
      message: "User Registered Successfully",
      userData: { id: user.id, name: user.name, email: user.email },
    });
    return;
  } catch (err) {
    logger.error("Error while creating User", err);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponse: HttpResponseMessages.INTERNAL_SERVER_ERROR,
      error: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong while creating user",
    });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Get Repository
    const userRepository = AppDataSource.getRepository(User);

    // Find User
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.error("Invalid Credentials");
      res.status(HttpStatusCodes.FORBIDDEN).json({
        statusCode: HttpStatusCodes.FORBIDDEN,
        httpResponse: HttpResponseMessages.FORBIDDEN,
        message: "Invalid Credentials",
      });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user?.id },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1h",
      }
    );
    const userData = {
      name: user.name,
      email: user.email,
      token,
    };
    res.status(HttpStatusCodes.OK).json({
      statusCode: HttpStatusCodes.OK,
      httpResponse: HttpResponseMessages.SUCCESS,
      message: "User Logged In  Successfully",
      userData,
    });
  } catch (err) {
    logger.error("Internal Server Error");
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponse: HttpResponseMessages.INTERNAL_SERVER_ERROR,
      error: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong while logging",
    });
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Frontend should handle token removal; backend can use a blacklist approach
    res.status(HttpStatusCodes.OK).json({
      message: "User Logged Out (Token should be removed on client side)",
    });
    return;
  } catch (err) {
    logger.error("Error while logout");
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
