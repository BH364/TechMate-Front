import React from 'react';
import { BASE_URL, DEFAULT_IMG } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestCard = ({ user }) => {
  const { firstName, lastName, age, about, photourl, skills, gender } = user.fromUserId;
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="md:w-96 bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 dark:text-white rounded-xl shadow-lg p-6 mx-auto my-4">

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* User Image */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={photourl || DEFAULT_IMG}
            alt={`${firstName}'s Avatar`}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-gray-300 shadow-sm"
          />
        </div>

        {/* User Details */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-amber-700 dark:text-orange-300">
            {firstName} {lastName}
          </h1>
          {gender && (
            <p className="font-medium dark:text-gray-400 text-gray-600">
              <span className="font-semibold dark:text-gray-300 text-gray-700">Gender:</span> {gender}
            </p>
          )}
          {age && (
            <p className="font-medium dark:text-gray-400 text-gray-600">
              <span className="font-semibold dark:text-gray-300 text-gray-700">Age:</span> {age}
            </p>
          )}
          {skills.length>0 && (
            <p className="font-medium dark:text-gray-400 text-gray-600">
              <span className="font-semibold dark:text-gray-300 text-gray-700">Skills:</span> {skills.join(', ')}
            </p>
          )}
          {about && (
            <p className="font-medium dark:text-gray-400 text-gray-600">
              <span className="font-semibold dark:text-gray-300 text-gray-700">About:</span> {about}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center md:justify-end gap-4 mt-6">
        <button
          className="px-4 py-2 text-sm md:text-base font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => reviewRequest('rejected', user._id)}
        >
          Reject
        </button>
        <button
          className="px-4 py-2 text-sm md:text-base font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
          onClick={() => reviewRequest('accepted', user._id)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
