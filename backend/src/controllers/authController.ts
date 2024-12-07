import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { sendOtp } from '../otpService';

export const loginUser = async (req: Request, res: Response) => {
  const { userId, password, otp } = req.body;
  
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register.' });
    }

    const otpGenerated = sendOtp(user.phoneNumber); // Generate OTP and send
    // For simplicity, OTP is sent but in real case, validate it securely

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'OTP sent, please verify' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { userId, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ userId, password: hashedPassword, phoneNumber });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
