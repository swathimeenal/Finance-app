import express from 'express';
import bcrypt from 'bcrypt';
import { adminModel  } from '../models/adminModel.js';

const router = express.Router();

// Admin setup (for initial setup or to create an admin account)
router.post('/setup', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const existingAdmin = await adminModel.findOne({ email });

        if (existingAdmin && existingAdmin.isSetupComplete) {
            return res.status(400).json({ message: "Admin account already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingAdmin) {
            existingAdmin.username = username;
            existingAdmin.password = hashedPassword;
            existingAdmin.isSetupComplete = true;
            await existingAdmin.save();
        } else {
            const newAdmin = new Admin({
                username,
                password: hashedPassword,
                email,
                isSetupComplete: true
            });
            await newAdmin.save();
        }

        res.status(201).json({ message: "Admin account setup complete." });
    } catch (err) {
        res.status(500).json({ message: "Error setting up admin account." });
    }
});

// You can add more admin-related routes here, like admin login, view dashboard, etc.

export {router as adminRouter};