import React from 'react';

const PostCard = () => {

    const blogPost = {
        id: 1,
        postImage: '../src/assets/blog-post.jpg',
        title: 'Lorem ipsum dolor sit amet ipsum dolor sit amet hello',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi distinctio itaque harum quod, esse qui tenetur sit praesentium doloribus minima facilis, aliquam similique pariatur omnis modi! Voluptatem veritatis laborum excepturi nam nesciunt enim accusantium optio tempore hic tenetur sequi quibusdam, atque labore recusandae. Delectus, illo sapiente animi asperiores doloribus culpa.',
        author: '@author',
        authorImage: '../src/assets/avatar.png',
        date: '20 Aug 2024',
        tags: ['internet', 'technology', 'programming'],
    };

    const { id, postImage, title, content, author, authorImage, date, tags } = blogPost;

    return (
        <div className='w-[90%] md:w-[70%] h-fit flex flex-col md:flex-row justify-center shadow-lg rounded-xl overflow-hidden gap-2 bg-white'>
            <div className='w-full md:w-[35%] h-[150px] md:h-auto flex justify-center items-center rounded-xl overflow-hidden md:shrink-0'>
                <img src={postImage} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='w-full md:w-[65%]  md:h-auto flex flex-col py-2 md:py-5 px-3 justify-between'>
                <div className='flex flex-col'>
                    <div>
                        {tags.map((tag, index) => (
                            <span key={index} className='tracking-wide inline-block bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2 hover:underline cursor-pointer'>{tag}</span>
                        ))}
                    </div>
                    <h1 className='text-md sm:text-xl md:text-2xl font-bold mb-1 md:mb-2 '>
                        {title}
                    </h1>
                    <p className='hidden md:block text-sm text-slate-500'>
                        {content.length > 170 ? content.slice(0, 170) + '...' : content}
                    </p>
                </div>
                <div className='flex mb-2 text-sm font-semibold text-gray-700 items-center justify-between mt-2 md:mt-4 px-2'>
                    <div className='flex items-center gap-1 text-sm text-indigo-800 font-semibold hover:underline underline-offset-2 cursor-pointer'>
                        <img src={authorImage} alt="avatar" className='w-7 h-7 md:w-10 md:h-10 rounded-full' />
                        <p>{author}</p>
                    </div>
                    <p className='text-slate-800'>{date}</p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;