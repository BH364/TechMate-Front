import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequest } from '../utils/requestSlice';
import RequestCard from './RequestCard';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex min-h-screen flex-col justify-center items-center h-full text-center">
       
        <h1 className="text-2xl md:text-4xl font-bold text-gray-600">
          No Requests Found! 🔍
        </h1>
        <p className="mt-2 text-gray-500">
          It seems like no one has sent you a request yet. Head to the{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
          >
            Feed page
          </span>{' '}
          to explore connections.
        </p>
        <button
          onClick={fetchRequests}
          className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Refresh Requests
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl text-blue-600 font-bold text-center mb-8">
        Connection Requests
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <RequestCard key={request._id} user={request} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
