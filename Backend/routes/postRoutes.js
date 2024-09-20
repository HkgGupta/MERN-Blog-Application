import express from 'express';
import { userAuth } from '../middleware/userAuth.js';
import { createPost, deletePost, getAllPosts, getPopularPosts, getPostById, getPostsByTag, postsByUserName, searchPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/all-posts', getAllPosts);
router.get('/postById/:postId', getPostById);
router.get('/postsByUserName/:userName', postsByUserName);
router.get('/postByTag/:tags', getPostsByTag);
router.get('/getPopularPosts', getPopularPosts);
router.get('/search-post/:search', searchPost);

router.post('/create-post', userAuth, createPost);
router.put('/update-post/:postId', userAuth, updatePost);
router.delete('/delete-post/:postId', userAuth, deletePost);

export default router;