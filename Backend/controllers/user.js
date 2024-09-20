import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { uploadImage } from '../utils/uploadImage_Cloudinary.js';
import { deleteOldPhoto } from '../utils/deleteOldPhoto_Cloudinary.js';

//@GET: /api/user/details
export const userDetails = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        const user = await userModel.findOne({ _id: userId }).select("-password");

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
        let { userName, fullName, email, phone, password } = req.body;
        const photo = req.files?.photo;

        if (!userName || !fullName || !email || !phone || !password || !photo) {
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

        userName = userName.trim().replace(/[^a-zA-Z0-9-]/g, '');

        const isUserNameExist = await userModel.findOne({
            userName: {
                $regex: new RegExp(`^${userName}$`, 'i')
            }
        });

        if (isUserNameExist) {
            return res.status(400).json({
                success: false,
                message: "UserName already taken! Try some unique one."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const uploadImageResult = await uploadImage(photo, "profiles");

        if (uploadImageResult.success === false) {
            return res.status(400).json({
                success: false,
                message: uploadImageResult.message
            });
        }

        const photoData = {
            public_id: uploadImageResult.public_id,
            url: uploadImageResult.url
        };

        // console.log(uploadImageResult);

        const newUser = new userModel({
            userName,
            fullName,
            email: email.toLowerCase().trim(),
            phone,
            photo: photoData,
            password: hashedPassword
        });

        // TODO: send OTP verification email to new user

        await newUser.save();

        // TODO: send welcome email to new user with login credentials

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
            userName = userName.trim().replace(/[^a-zA-Z0-9-]/g, '');
        }
        if (email) {
            email = email.trim().toLowerCase();
        }

        const user = await userModel.findOne({
            $or: [{
                userName: {
                    $regex: new RegExp(`^${userName}$`, 'i')
                }
            },
            { email }
            ]
        });

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

        const userInfo = {
            userId: user._id,
            email: user.email
        };

        const token = jwt.sign({ credential: userInfo }, process.env.JWT_SECRET, { expiresIn: "30d" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @POST: /api/user/user-verify
export const userVerify = async (req, res) => {
    try {
        const { userId } = req.userInfo;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.verified = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User verified successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @POST: /api/user/user-update-profile
export const userUpdateProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        let { userName, fullName, phone, city, description } = req.body;
        let photo = req.files?.photo;

        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (userName) {
            userName = userName.trim().replace(/[^a-zA-Z0-9-]/g, '');

            const isUserNameExist = await userModel.findOne({
                userName: {
                    $regex: new RegExp(`^${userName}$`, 'i'),
                    $ne: user.userName
                }
            });

            if (isUserNameExist) {
                return res.status(400).json({
                    success: false,
                    message: "UserName already taken! Try some unique one.",
                    isUserNameExist
                });
            }
        }

        if (photo) {
            const uploadImageResult = await uploadImage(photo, "profiles");
            if (uploadImageResult.success === false) {
                return res.status(400).json({
                    success: false,
                    message: uploadImageResult.message
                });
            }
            photo = {
                public_id: uploadImageResult.public_id,
                url: uploadImageResult.url
            };

            await deleteOldPhoto(user.photo.public_id);
        }

        const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {
            userName: userName ? userName : user.userName,
            fullName: fullName ? fullName : user.fullName,
            phone: phone ? phone : user.phone,
            photo: photo ? photo : user.photo,
            city: city ? city : user.city,
            description: description ? description : user.description
        }, { new: true });

        // TODO: send email to user with updated profile

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @POST: /api/user/user-update-password
export const userUpdatePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await userModel.findOneAndUpdate({ _id: userId }, {
            password: hashedPassword
        });

        // TODO: Send email to user for password change

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @DELETE: /api/user/delete
export const userDelete = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ _id: userId });
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

        // TODO: Send email to user for account deletion

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



