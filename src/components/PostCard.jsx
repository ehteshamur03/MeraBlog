/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="w-full">
            <div className="relative bg-gradient-to-r from-[#E1DADA] to-[#BDCAD9] rounded-xl p-4 flex flex-col h-full shadow-xl hover:scale-105 transition-all duration-700 ease-in-out items-center justify-center hover:ring-4 hover:ring-[#f3c5c5] hover:ring-opacity-50">
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-lg rounded-xl"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-xl object-cover w-full h-48 md:h-56 lg:h-64 transition-all duration-500 ease-in-out transform hover:scale-105"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4 transform transition-all duration-500 ease-in-out hover:text-[#f57c5f] relative z-10">
                    {title}
                </h2>
            </div>
        </Link>
    );
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
};

export default PostCard;
