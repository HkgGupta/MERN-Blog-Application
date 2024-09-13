import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router-dom';
import './PostCreateUpdate.css';

const PostEdit = () => {

    const { id } = useParams();

    const editor = useRef(null);
    const [post, setPost] = useState({
        title: '',
        tags: '',
        content: ''
    });

    const fetchPost = () => {

        // Fetch Post Details
        const data = {
            id: 1,
            postImage: '../src/assets/blog-post.jpg',
            title: 'Lorem ipsum dolor sit amet ipsum dolor sit amet hello',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi distinctio itaque harum quod, esse qui tenetur sit praesentium doloribus minima facilis, aliquam similique pariatur omnis modi! Voluptatem veritatis laborum excepturi nam nesciunt enim accusantium optio tempore hic tenetur sequi quibusdam, atque labore recusandae. Delectus, illo sapiente animi asperiores doloribus culpa.',
            author: '@author',
            authorImage: '../src/assets/avatar.png',
            tags: ['internet', 'technology', 'programming'],
        };

        setPost(data);
    };

    const updatePost = (e) => {
        e.preventDefault();
        // Update Post
        console.log(post);
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
            autoFocus: true,
            spellcheck: true,
            minHeight: 400,
            buttons: "bold,italic,underline,strikethrough,eraser,|,brush,font,fontsize,paragraph,|,ul,ol,lineHeight,|,superscript,subscript,|,indent,outdent,left,center,right,|,file,image,video,spellcheck,|,cut,copy,paste,selectall,|,table,link,symbols,hr,|,undo,redo,|,classSpan,find,|,source,preview,|,fullsize,print",
        }),
        []
    );

    return (
        <div className='w-full h-fit flex flex-col justify-center items-center'>
            <div className='w-full md:w-[90%] px-2'>
                <h1 className='text-base sm:text-xl md:text-2xl lg:text-3xl font-bold my-5 text-center '>Update Post</h1>

                <div className='w-full flex justify-center items-center px-5'>
                    <form action="" className='flex flex-col gap-4 w-full' onSubmit={(e) => updatePost(e)}>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <input
                                    type="text"
                                    name='title'
                                    defaultValue={post.title}
                                    placeholder="Post Title*"
                                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                                    className='px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md w-full tracking-wider' />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Title is required.</p>
                        </div>

                        <div className='flex flex-col h-full'>
                            <div className='flex flex-row w-full relative h-full'>

                                <input
                                    type="text"
                                    name='tags'
                                    defaultValue={post.tags}
                                    placeholder="Tags (comma separated)*"
                                    onChange={(e) => setPost({ ...post, tags: e.target.value })}
                                    className={`px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md w-full tracking-wider`} />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Tags are required.</p>
                        </div>
                        <JoditEditor
                            ref={editor}
                            value={post.content}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContent) => setPost({ ...post, content: newContent })}
                            onChange={newContent => setPost({ ...post, content: newContent })}
                        />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5 mx-4'>Update Post</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default PostEdit;
