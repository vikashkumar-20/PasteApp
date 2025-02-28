import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Pastes = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleCopy(content) {
        navigator.clipboard.writeText(content);
        toast.success('Copied to clipboard');
    }

    return (
        <div className="p-6 max-w-5xl mx-auto bg-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
                All Pastes
            </h2>

            <div className="flex justify-center mb-8">
                <input
                    type="search"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-2 p-3 rounded-lg w-1/2 bg-white text-black placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div
                            key={paste?._id}
                            className="bg-white p-6 rounded-md shadow flex flex-col gap-4 border border-gray-300"
                        >
                            <h3 className="text-lg font-medium text-gray-800 truncate">
                                {paste.title}
                            </h3>

                            <p className="text-gray-600 line-clamp-3">
                                {paste.content}
                            </p>

                            <div className="flex flex-row gap-2 justify-start mt-auto">
                                <Link
                                    to={`/?pasteId=${paste?._id}`}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                >
                                    Edit
                                </Link>

                                <Link
                                    to={`/pastes/${paste?._id}`}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => handleDelete(paste?._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => handleCopy(paste?.content)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                >
                                    Copy
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mt-4">
                                {new Date(paste?.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>

                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No pastes found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Pastes;