import React, { useEffect, useState } from 'react';

const PopularPosts = () => {


    const [popularPosts, setPopularPosts] = useState([]);

    const posts = [
        {
            id: 11,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Popular Post 1: Lorem ipsum dolor sit amet',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            author: '@author1',
            authorImage: '../src/assets/avatar.png',
            date: '20 Aug 2024',
            tags: ['internet', 'technology'],
        },
        {
            id: 22,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Popular Post 2: Another Interesting Blog Post',
            content: 'This is another short excerpt of the second blog post...',
            author: '@author2',
            authorImage: '../src/assets/avatar.png',
            date: '25 Aug 2024',
            tags: ['web development', 'javascript'],
        },
        {
            id: 33,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Popular Post 3: Lorem ipsum dolor ',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            author: '@author3',
            authorImage: '../src/assets/avatar.png',
            date: '30 Aug 2024',
            tags: ['internet', 'technology'],
        },
        {
            id: 44,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Popular Post 4: Another Interesting ',
            content: 'This is another short excerpt of the second blog post...',
            author: '@author4',
            authorImage: '../src/assets/avatar.png',
            date: '35 Aug 2024',
            tags: ['web development', 'javascript'],
        },
        {
            id: 55,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Popular Post 5: Lorem ipsum dolor sit amet',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            author: '@author5',
            authorImage: '../src/assets/avatar.png',
            date: '40 Aug 2024',
            tags: ['internet', 'technology'],
        },
    ];

    const fetchPopularPosts = async () => {
        try {
            setPopularPosts(posts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPopularPosts();
    }, []);

    return (
        <div className='w-full h-auto flex flex-col'>
            <h1 className='text-md sm:text-xl md:text-2xl font-bold px-3 py-2'>Popular Posts</h1>
            <div className='w-full flex flex-row flex-wrap  overflow-hidden cursor-pointer gap-2'>
                {popularPosts.map((post) => (
                    <div key={post.id} className='w-full min-[425px]:w-[48%] md:w-[32%] h-auto flex flex-col gap-1 px-2 py-1'>
                        <img src={post.postImage} alt="" className='w-full h-full object-cover rounded-md' />
                        <h1 className='text-base sm:text-md md:text-xl font-bold cursor-pointer hover:underline truncate py-1'>
                            {post.title}
                        </h1>
                        <p className='text-sm text-slate-500 cursor-pointer'>
                            {post.date}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularPosts;