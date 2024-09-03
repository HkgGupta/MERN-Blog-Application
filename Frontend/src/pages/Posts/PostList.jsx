import React from 'react';
import PostCard from './../../components/PostCard';

const PostList = () => {
    return (
        <div className='w-full flex flex-col items-center gap-5 my-5'>
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    );
};

export default PostList;