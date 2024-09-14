import React from 'react';
import PostCard from './../../components/PostCard';

const PostList = () => {

    const posts = [
        {
            id: 11,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Post 1: Lorem ipsum dolor sit amet',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            author: '@author1',
            authorImage: '../src/assets/avatar.png',
            date: '20 Aug 2024',
            tags: ['internet', 'technology'],
        },
        {
            id: 22,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Post 2: Another Interesting Blog Post',
            content: 'This is another short excerpt of the second blog post...',
            author: '@author2',
            authorImage: '../src/assets/avatar.png',
            date: '25 Aug 2024',
            tags: ['web development', 'javascript'],
        },
    ];

    return (
        <div className='w-full flex flex-col items-center gap-5 py-5'>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;