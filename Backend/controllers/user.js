import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

//@GET: /api/user/details
export const userDetails = async (req, res) => {
    try {
        const userName = req.body.userName;  // TODO: Get Current UserName or Email from Token

        const user = await userModel.findOne({ userName: userName }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//@POST: /api/user/register
export const userRegister = async (req, res) => {
    try {
        const { userName, fullName, email, phone, password } = req.body;

        if (!userName || !fullName || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userExist = await userModel.findOne({ email: email.toLowerCase().trim() });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const modifiedUserName = userName.trim().replace(/[^a-zA-Z0-9-]/g, '');

        const isUserNameExist = await userModel.findOne({ userName: modifiedUserName.toLowerCase() });

        if (isUserNameExist) {
            return res.status(400).json({
                success: false,
                message: "UserName already taken! Try some unique one."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new userModel({
            userName: modifiedUserName,
            fullName,
            email: email.toLowerCase().trim(),
            phone,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//@POST: /api/user/login
export const userLogin = async (req, res) => {
    try {
        let { userName, email, password } = req.body;

        if ((!userName || !email) && !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (userName) {
            userName = userName.trim().replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        }
        if (email) {
            email = email.trim().toLowerCase();
        }

        const user = await userModel.findOne({ $or: [{ userName }, { email }] });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @POST: /api/user/delete
export const userDelete = async (req, res) => {
    try {
        const { userName, email, password } = req.body; // TODO: Get Current UserName or Email from Token

        if ((!userName || !email) && !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ $or: [{ userName }, { email }] });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        await userModel.deleteOne({ _id: user._id }); // TODO: Make status to false for soft delete
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


