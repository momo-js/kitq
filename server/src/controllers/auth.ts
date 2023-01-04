import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { config } from "dotenv";
config();

/* REGISTER USER */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, pass } = req.body;

    const user = await User.findOne({ login: login });
    if (user) return res.status(400).json({ msg: "User already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pass, salt);

    const newUser = new User({
      login,
      pass: passwordHash,
    });
    const savedUser = await newUser.save();

    res.status(201).json({...savedUser, message: 'Account created!'});
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, pass } = req.body;
    const user = await User.findOne({ login: login });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    // @ts-ignore
    delete user.pass;
    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
