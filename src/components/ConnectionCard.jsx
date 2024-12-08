import React from 'react';
import { DEFAULT_IMG } from '../utils/constants';
import { Link } from 'react-router-dom';

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, age, about, photourl, skills, gender } = user;

  return (
    <div className="md:w-96 bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 dark:text-white rounded-xl shadow-lg p-6 mx-auto my-4">
      {/* Card Layout */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Profile Image */}
        <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
          <img
            src={photourl || DEFAULT_IMG}
            alt={`${firstName} ${lastName}`}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-2 border-gray-500"
          />
        </div>

        {/* User Details */}
        <div className="md:w-2/3 text-center md:text-left md:ml-6">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {firstName} {lastName}
          </h1>

          {/* Gender */}
          {gender && (
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-2">
              <span className="font-semibold text-gray-700 dark:text-gray-400">Gender:</span> {gender}
            </p>
          )}

          {/* Age */}
          {age && (
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-1">
              <span className="font-semibold text-gray-700 dark:text-gray-400">Age:</span> {age}
            </p>
          )}

          {/* Skills */}
          {skills.length>0 && (
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-1">
              <span className="font-semibold text-gray-400">Skills:</span> {skills}
            </p>
          )}

          {/* About Section */}
          {about && (
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-2">
              <span className="font-semibold text-gray-700 dark:text-gray-400">About:</span> {about}
            </p>
          )}
       <div className='my-4 mx-2'>
       <Link
  to='/chat'
  className='bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:scale-105 hover:from-purple-600 hover:to-blue-500 transition-transform duration-300 ease-in-out'
>
  Message
</Link>
       </div>
        </div>
      
      </div>
    </div>
  );
};

export default ConnectionCard;
