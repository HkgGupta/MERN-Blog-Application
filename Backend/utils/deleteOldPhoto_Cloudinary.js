import { v2 as cloudinary } from 'cloudinary';

export const deleteOldPhoto = async (publicId) => {
    await cloudinary.uploader
        .destroy(publicId)
        .catch((error) => {
            console.log(error);
        });
};