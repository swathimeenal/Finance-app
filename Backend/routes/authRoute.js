// authRouter.js
import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { Admin } from '../models/adminModel.js';

const router1 = express.Router();

// Setup NodeMailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Forgot Password - Sends an OTP to the admin's email
router1.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin with this email does not exist." });
        }

        const otp = crypto.randomInt(100000, 999999);
        const otpHash = await bcrypt.hash(otp.toString(), 10);

        admin.otpHash = otpHash;
        await admin.save();

        // Send OTP to the admin's email
        const mailOptions = {
            from: process.env.EMAIL,
            to: admin.email,
            subject: 'OTP for Password Reset',
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
        };

        transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent to your email." });
    } catch (err) {
        res.status(500).json({ message: "Error in processing request." });
    }
});

// Reset Password - Resets the admin's password using the OTP
router1.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin with this email does not exist." });
        }

        const isMatch = await bcrypt.compare(otp, admin.otpHash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        admin.otpHash = undefined; // Clear OTP hash after successful password reset
        await admin.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (err) {
        res.status(500).json({ message: "Error in resetting password." });
    }
});

export default router1;