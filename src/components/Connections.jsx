import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import ConnectionCard from './ConnectionCard';

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/connections`, {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20 space-y-6">
        {/* Illustration */}
        <img
          src="https://via.placeholder.com/150?text=No+Connections" // Replace with your actual illustration URL
          alt="No Connections Illustration"
          className="w-64 h-64 object-contain"
        />

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
          You Have No Connections Yet
        </h1>

        {/* Encouragement Text */}
        <p className="text-lg md:text-xl text-gray-500 max-w-lg text-center">
          Start exploring and connecting with like-minded developers to grow your professional network!
        </p>

        {/* Call-to-Action Button */}
        <a
          href="/discover"
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Discover Developers
        </a>
      </div>
    );
  }

  return (
    <div className="text-center mb-52 mt-10">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-6">
        Connections
      </h1>

      {/* Connections List */}
      <div className="mx-auto lg:w-3/4 md:w-5/6 sm:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <ConnectionCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
