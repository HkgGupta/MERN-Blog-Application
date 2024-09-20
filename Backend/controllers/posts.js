import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { uploadImage } from "../utils/uploadImage_Cloudinary.js";
import { deleteOldPhoto } from "../utils/deleteOldPhoto_Cloudinary.js";

// @GET: /api/post/all-posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel
            .find({})
            .sort({ createdAt: -1 })
            .populate({
                path: "userId",
                select: "userName photo"
            });

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @GET: /api/post/postById/:postId
export const getPostById = async (req, res) => {
    try {
        const postId = req.params.postId || null;

        console.log(postId);

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post Id is required"
            });
        }
        const post = await postModel
            .findById(postId)
            .populate({
                path: "userId",
                select: "userName photo"
            });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        };
        return res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @GET: /api/post/postsByUserName/:userName
export const postsByUserName = async (req, res) => {
    try {
        const { userName } = req.params;

        if (!userName) {
            return res.status(400).json({
                success: false,
                message: "UserName is required."
            });
        }

        const user = await userModel.findOne({ userName: userName }).select("userName fullName photo city totalPosts  totalFollowers totalFollowing description verified createdAt");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "UserName Not Found"
            });
        }

        const posts = await postModel.find({ userId: user._id });

        return res.status(200).json({
            success: true,
            count: posts.length,
            author: user,
            posts: posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong."
        });
    }
};

// @GET: /api/post/postByTag/:tags
export const getPostsByTag = async (req, res) => {
    try {
        const { tags } = req.params;
        const tagsList = tags.split(",").map(tag => tag.trim());

        if (!tagsList) {
            return res.status(400).json({
                success: false,
                message: "Tags is required."
            });
        }

        const regexConditions = tagsList.map(tag => ({
            tags: { $regex: new RegExp(tag, 'i') }
        }));

        const posts = await postModel.find({
            $or: regexConditions
        }).populate({
            path: "userId",
            select: "userName photo"
        });

        return res.status(200).json({
            success: true,
            count: posts.length,
            tags: tagsList,
            data: posts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @GET: /api/post/getPopularPosts
export const getPopularPosts = async (req, res) => {
    try {
        const posts = await postModel
            .find({})
            .sort({ views: -1 }).populate({
                path: "userId",
                select: "userName photo"
            });

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @GET: /api/post/search-post/:search
export const searchPost = async (req, res) => {
    try {
        const { search } = req.params;

        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            });
        }

        const regex = new RegExp(search, 'i');

        const posts = await postModel
            .find({
                $or: [
                    { title: regex },
                    { tags: regex },
                    { aliasURL: regex }
                ]
            })
            .populate({
                path: "userId",
                select: "userName photo"
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

// @POST: /api/post/create-post
export const createPost = async (req, res) => {
    try {
        const { userId } = req.userInfo;
        let { title, content, tags, aliasURL } = req.body;
        const postThumbnail = req.files?.postThumbnail;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!title || !content || !tags || !postThumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (aliasURL) {
            aliasURL = aliasURL.trim().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        }

        const isAliasURLExist = await postModel.findOne({
            aliasURL: {
                $regex: new RegExp(`^${aliasURL}$`, 'i')
            }
        });

        if (isAliasURLExist) {
            return res.status(400).json({
                success: false,
                message: "Alias URL already exists"
            });
        }

        tags = tags.split(",").map((tag) => tag.trim().toLowerCase());

        const user = await userModel.findOne({ _id: userId });

        if (!user || !user.verified) {
            return res.status(401).json({
                success: false,
                message: "User not found or not verified"
            });
        }

        const uploadImageResult = await uploadImage(postThumbnail, "postThumbnail");

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

        const newPost = new postModel({
            userId,
            aliasURL,
            title,
            content,
            postThumbnail: photoData,
            date: new Date().toDateString(),
            tags,
        });

        const savedPost = await newPost.save();

        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: savedPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { userId } = req.userInfo;
        const { postId } = req.params;
        let { title, content, tags, aliasURL } = req.body;
        const postThumbnail = req.files?.postThumbnail;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required"
            });
        }

        const post = await postModel.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post"
            });
        }

        if (aliasURL) {
            aliasURL = aliasURL.trim().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '');
            const isAliasURLExist = await postModel.findOne({
                aliasURL: {
                    $regex: new RegExp(`^${aliasURL}$`, 'i'),
                    $ne: post.aliasURL
                }
            });

            if (isAliasURLExist) {
                return res.status(400).json({
                    success: false,
                    message: "Alias URL already exists"
                });
            }
        }

        if (tags) {
            tags = tags.split(",").map((tag) => tag.trim().toLowerCase());
            tags = tags.filter((tag) => tag !== '');
        }

        const user = await userModel.findOne({ _id: userId });

        if (!user || !user.verified) {
            return res.status(401).json({
                success: false,
                message: "User not found or not verified"
            });
        }

        if (postThumbnail) {
            const uploadImageResult = await uploadImage(postThumbnail, "postThumbnail");

            if (uploadImageResult.success === false) {
                return res.status(400).json({
                    success: false,
                    message: uploadImageResult.message
                });
            }

            postThumbnail = {
                public_id: uploadImageResult.public_id,
                url: uploadImageResult.url
            };

            await deleteOldPhoto(post.postThumbnail.public_id);
        }

        const updatedPost = await postModel.findByIdAndUpdate({ _id: postId }, {
            aliasURL: aliasURL ? aliasURL : post.aliasURL,
            title: title ? title : post.title,
            content: content ? content : post.content,
            postThumbnail: postThumbnail ? postThumbnail : post.postThumbnail,
            tags: tags ? tags : post.tags,
        },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Post Updated successfully",
            data: updatedPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.userInfo;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required"
            });
        }

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this post"
            });
        }

        await postModel.findByIdAndUpdate(postId, {
            visibility: "deleted"
        });

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

