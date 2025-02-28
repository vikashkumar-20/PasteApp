import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        let paste = null;
        if (pasteId) {
            paste = allPastes.find((p) => p._id === pasteId);
            console.log('Paste Found:', paste);
        }
        setTitle(paste?.title || '');
        setValue(paste?.content || '');
    }, [pasteId, allPastes]);
    

    function createPaste() {
        // Check if a paste with the same title and content already exists
        const isDuplicate = allPastes.some(
            (p) => p.title === title && p.content === value && p._id !== pasteId
        );
    
        if (isDuplicate) {
            alert('A paste with the same title and content already exists!');
            return;
        }
    
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };
    
        console.log('Paste Date:', paste?.createdAt);
    
        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }
    
        setTitle('');
        setValue('');
        searchParams({});
    }
    

    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6 bg-gray-200" >
            
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl mx-auto">
                
                <input
                    className="flex-grow border border-gray-300 p-3 rounded-lg 
                    bg-white text-black placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    transition shadow-sm hover:shadow-md"
                    type="text"
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <button
                    onClick={createPaste}
                    className="bg-blue-600 text-white font-semibold 
                    p-3 rounded-lg shadow-md 
                    hover:bg-blue-700 
                    active:scale-95 transition-all duration-200 
                    ease-in-out transform hover:-translate-y-1 
                    hover:shadow-lg"
                >
                    {pasteId ? 'Update My Paste' : 'Create My Paste'}
                </button>
            </div>

            <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 p-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>

                <textarea
                    className="w-full p-4 h-96 bg-white text-black placeholder-gray-500 
                    focus:outline-none resize-none rounded-b-xl"
                    value={value}
                    placeholder="Write Your Content Here...."
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
                
            </div>
        </div>
    );
};

export default Home;