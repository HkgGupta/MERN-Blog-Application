import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    aliasURL: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postThumbnail: {
        type: Object,
        required: true
    },
    // author: {
    //     type: String,
    //     required: true
    // },
    // authorImage: {
    //     type: Object,
    //     required: true
    // },
    date: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'delete'],
        default: 'public'
    },
    views: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
