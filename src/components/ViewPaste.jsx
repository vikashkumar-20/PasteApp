import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PasteDetails = () => {
    const { id } = useParams(); // Get the paste ID from the URL
    const pastes = useSelector((state) => state.paste.pastes);
    const [paste, setPaste] = useState('');

    useEffect(() => {
        const selectedPaste = pastes.find((p) => p._id === id);
        setPaste(selectedPaste);
    }, [id, pastes]);

    return (
        <div className="p-6 min-w-6xl mx-auto flex flex-col gap-6 bg-gray-100">
            
            {/* Title Input */}
            <input
                type="text"
                value={paste?.title || ''}
                disabled
                className="w-full p-3 text-lg border rounded-md bg-white 
                           shadow-sm text-gray-700 placeholder-gray-500 
                           focus:outline-none transition hover:shadow-md"
                placeholder="Paste Title"
            />

            {/* Content Area with Mac-like Buttons */}
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm w-full h-96">
                <div className="flex items-center gap-2 p-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>

                <textarea
                    className="w-full p-4 bg-white text-black placeholder-gray-500 
                               focus:outline-none resize-none rounded-b-xl h-full"
                    value={paste?.content || ''}
                    disabled
                    placeholder="Write Your Content Here...."
                />
                
            </div>
                
            <p className="text-xs text-gray-500 mt-2">
                {paste?.createdAt
                    ? new Date(paste?.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                      })
                    : 'Invalid Date'}
            </p>
        </div>
    );
};

export default PasteDetails;
