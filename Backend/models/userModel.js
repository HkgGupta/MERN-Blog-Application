import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: "",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('user', userSchema);

export default userModel;