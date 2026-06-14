import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error) {
  console.log("LOGIN ERROR =>", error);

  res.status(500).json({
    message: "Server Error",
  });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};