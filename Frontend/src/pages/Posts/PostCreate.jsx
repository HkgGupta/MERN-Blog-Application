import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
// import './PostCreateUpdate.css';

const PostCreate = () => {
    const editor = useRef(null);
    const [newPost, setNewPost] = useState({
        title: '',
        tags: '',
        content: ''
    });

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

    const createPost = (e) => {
        e.preventDefault();
        console.log(newPost);
    };

    return (
        <div className='w-full h-fit flex flex-col justify-center items-center'>
            <div className='w-full md:w-[90%] px-2'>
                <h1 className='text-base sm:text-xl md:text-2xl lg:text-3xl font-bold my-5 text-center '>Create New Post</h1>

                <div className='w-full flex justify-center items-center px-5'>
                    <form action="" className='flex flex-col gap-4 w-full' onSubmit={(e) => createPost(e)}>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <input
                                    type="text"
                                    name='title'
                                    placeholder="Post Title*"
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    className='px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md w-full tracking-wider' />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Title is required.</p>
                        </div>

                        <div className='flex flex-col h-full'>
                            <div className='flex flex-row w-full relative h-full'>

                                <input
                                    type="text"
                                    name='tags'
                                    placeholder="Tags (comma separated)*"
                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                    className={`px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md w-full tracking-wider`} />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Tags are required.</p>
                        </div>
                        <JoditEditor
                            ref={editor}
                            value={newPost.content}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContent) => setNewPost({ ...newPost, content: newContent })}
                            onChange={newContent => setNewPost({ ...newPost, content: newContent })}
                        />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5 mx-4'>Create Post</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default PostCreate;
