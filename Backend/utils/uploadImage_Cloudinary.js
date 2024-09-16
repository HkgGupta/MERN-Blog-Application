import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

export const uploadImage = async (image, folderName) => {

    if (!image) {
        return null;
    }

    if (image.mimetype !== "image/jpeg" && image.mimetype !== "image/png" && image.mimetype !== "image/jpg") {
        return {
            success: false,
            message: "File Type Error - Only Image Formats are allowed"
        };
    }

    if (image.size > 1024 * 1024) {
        return {
            success: false,
            message: "File Size Error - File must be less than 1MB"
        };
    }

    const imgName = Date.now() + "-" + image.name.split(".")[0].replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

    // move image to public folder
    await image.mv(`./public/${imgName}`, async (err) => {
        if (err) {
            return {
                success: false,
                message: err.message
            };
        }
    });

    const uploadOptions = {
        folder: `Blog/${folderName}`,
        public_id: imgName,
        transformation: [],
    };

    // resize image if profile image
    // if (folderName === 'profiles') {
    //     uploadOptions.transformation = [
    //         { width: 300, height: 300, crop: 'fill' },
    //         { radius: 'max' }
    //     ];
    // }

    // upload image to cloudinary
    const uploadResult = await cloudinary.uploader
        .upload(
            `./public/${imgName}`,
            uploadOptions
        )
        .catch((error) => {
            console.log(error);
        });

    // remove image from public folder
    fs.unlink(`./public/${imgName}`, (err) => {
        if (err) {
            console.error(err);
        }
    });

    if (!uploadResult) {
        return null;
    }

    return uploadResult;
};