import React, { useEffect, useState } from 'react';

const PostComments = ({ postId }) => {

    const currUserId = '111';
    const [comment, setComment] = useState([]);

    const fetchComments = async () => {
        try {
            // const response = await fetch(`http://localhost:5000/api/comments/${postId}`);
            const data = [
                {
                    id: 1,
                    postId: 11,
                    authorId: "111",
                    author: '@shubham',
                    authorImage: '../src/assets/avatar.png',
                    message: 'hello',
                    date: '20 Aug 2024',
                },
                {
                    id: 2,
                    postId: 11,
                    authorId: "11185",
                    author: '@abc',
                    authorImage: '../src/assets/avatar.png',
                    message: 'hello again',
                    date: '50 Aug 2024',
                }
            ];
            setComment(data);
        }
        catch {

        }
    };

    useEffect(() => {
        fetchComments(postId);
    }, []);

    return (
        <>
            {
                comment.map((comment) => (
                    <div className='w-full h-auto flex flex-col px-3' key={comment.id}>
                        <div className='flex items-center text-sm text-gray-800 font-semibold gap-2'>
                            <img src={comment.authorImage} alt="avatar" className='w-[35px] h-[35px] rounded-full' />
                            <p className='text-slate-800 text-base flex items-center gap-1'>{comment.author}</p>
                        </div>
                        <div className='flex flex-col text-gray-800'>
                            <p className='text-slate-800 text-base flex gap-1 rounded'>
                                {comment.message}
                            </p>
                            <p className='text-gray-600 text-sm flex gap-1 rounded'>
                                {comment.date}
                            </p>
                        </div>
                        {currUserId === comment.authorId &&
                            <button className='text-red-500 font-bold rounded-xl w-auto self-start' >Delete</button>
                        }
                    </div>
                ))
            }
        </>
    );
};

export default PostComments;