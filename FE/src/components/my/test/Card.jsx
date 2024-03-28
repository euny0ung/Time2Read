import React, { useState } from 'react';

const Card = ({ imageUrl, title, category, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-64 h-64 md:w-72 md:h-72 mx-4 my-6 cursor-pointer rounded-lg overflow-hidden ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl ? (
        <div
          className={`w-full h-full border-4 overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transform ${
              isHovered ? 'scale-110' : ''
            }`}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full bg-gray-900 text-white text-center transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-50' : ''
          }`}
        >
          <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        </div>
      )}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center ${
          isHovered ? 'bg-gray-800 bg-opacity-80' : 'bg-gray-900 bg-opacity-70'
        } transition-opacity duration-300 ease-in-out opacity-0`}
      >
        <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">{title}</h2>
        <div className="inline-block px-3 py-1 mb-4 text-sm text-white rounded-lg bg-cadetblue">{category}</div>
        <p className="px-4 text-sm text-center text-gray-300 md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
