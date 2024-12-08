import React from 'react';
import { BASE_URL, DEFAULT_IMG } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photourl, about, skills, age, gender } = user;
  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true,
      });
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="card bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white w-72 md:w-96 shadow-2xl rounded-2xl overflow-hidden relative transform transition-all duration-300 hover:scale-105">
        <figure className="w-full h-64 overflow-hidden">
          <img
            src={photourl || DEFAULT_IMG}
            alt="User Photo"
            className="w-full h-full object-contain rounded-t-2xl"
          />
        </figure>
        <div className="card-body px-4 py-6">
          <h2 className="text-2xl font-bold">{firstName} {lastName || ''}</h2>
          {skills && <p className="pt-1 text-sm text-gray-400">{skills}</p>}
          <p className="pt-2 text-sm text-gray-300">{gender || ''} • {age || ''}</p>
          <p className="pt-4 text-sm text-gray-200">{about || "No bio available."}</p>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => handleFeed("ignored", _id)}
              className="btn btn-outline btn-red text-white rounded-full w-16 h-16 flex items-center justify-center border-2 border-red-500 hover:bg-white hover:text-white transition duration-300"
            >
              <span role="img" aria-label="Ignore" className='text-3xl'>❌</span>
            </button>
            <button
              onClick={() => handleFeed("interested", _id)}
              className="btn btn-outline btn-green text-white rounded-full w-16 h-16 flex items-center justify-center border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-300"
            >
              <span role="img" aria-label="Interested" className='text-3xl'>❤️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
