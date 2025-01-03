/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="w-full sm:w-1/2 md:w-1/3 p-4 transition-transform transform hover:scale-105"
    >
      <div className="relative bg-gradient-to-r from-[#F0F0F0] to-[#A3A3A3] rounded-xl p-6 flex flex-col h-full shadow-xl transition-all duration-700 ease-in-out items-center justify-center hover:ring-4 hover:ring-[#F1C6C6] hover:ring-opacity-50">
        
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-lg rounded-xl"></div>

        {/* Image section */}
        <div className="flex justify-center mb-6 relative z-10 w-full">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover w-full h-40 xs:h-48 sm:h-56 md:h-64 transition-all duration-500 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Title section */}
        <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-800 text-center mt-3 transform transition-all duration-500 ease-in-out hover:text-[#F57C5F] relative z-10">
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
